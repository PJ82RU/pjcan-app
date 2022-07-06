// noinspection SpellCheckingInspection

import EventEmitter from 'eventemitter3';
import { lang } from '@/i18n/i18nUtils';

export const BLUETOOTH_SERVICE_UUID = 'cc9e7b30-9834-488f-b762-aa62f5022dd4';
export const BLUETOOTH_CHARACTERISTIC_UUID = 'cc9e7b31-9834-488f-b762-aa62f5022dd4';
export const BLUETOOTH_SIZE_MAX = 512;

export const BLUETOOTH_EVENT_CONNECTED = 'Connected'; // Событие подключения
export const BLUETOOTH_EVENT_RECEIVE = 'Receive'; // Событие входящих данных
export const BLUETOOTH_EVENT_SEND = 'Send'; // Событие исходящих данных

export enum EConnectedStatus {
	NO_CONNECT,
	CONNECT,
	WAIT_CONNECT,
	DISCONNECT
}

/** Bluetooth */
export class Bluetooth extends EventEmitter {
	/** Объект устройства */
	private _device: BluetoothDevice | undefined;
	/** Характеристика устройства */
	private _characteristic: BluetoothRemoteGATTCharacteristic | undefined;

	constructor() {
		super();
		this.clear();
	}

	/** Очистка переменных */
	private clear(): void {
		this._device = undefined;
		this._characteristic = undefined;
	}

	/** Статус подключения */
	get connected(): boolean {
		return !!this._device && !!this._characteristic;
	}

	/** Запустить выбор Bluetooth устройства и подключиться к выбранному */
	connect(): Promise<void> {
		if (!navigator.bluetooth) {
			this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
			return Promise.resolve();
		}

		return !!this._device
			? Promise.resolve()
			: this.requestBluetoothDevice()
					.then((device: BluetoothDevice) => this.connectDeviceAndCharacteristic(device))
					.then((characteristic: BluetoothRemoteGATTCharacteristic | undefined) =>
						this.delayPromise(250, characteristic)
					)
					.then((characteristic: BluetoothRemoteGATTCharacteristic | undefined) =>
						this.startNotifications(characteristic)
					)
					.catch((e: any) => {
						this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
						console.log(e);
					});
	}

	/** Отключение от Bluetooth устройства */
	disconnect(): void {
		if (this._device) {
			const device = this._device;
			this.clear();
			device.gatt?.disconnect();

			console.log(lang('BLESrv_Device_Disconnected').replace('%', device.name));
			this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.DISCONNECT);
		}
	}

	/** Запрос выбора Bluetooth устройства */
	requestBluetoothDevice(): Promise<BluetoothDevice> {
		return navigator.bluetooth
			.requestDevice({ filters: [{ services: [BLUETOOTH_SERVICE_UUID] }] })
			.then((device: BluetoothDevice) => {
				console.log(lang('BLESrv_Device_Selected').replace('%', device.name));
				device.addEventListener('gattserverdisconnected', () => this.handleDisconnection());
				this._device = device;
				return device;
			});
	}

	/** Подключение к определенному устройству, получение сервиса и характеристики */
	private connectDeviceAndCharacteristic(
		device: BluetoothDevice
	): Promise<BluetoothRemoteGATTCharacteristic> | undefined {
		if (device.gatt?.connected && !!this._characteristic) return Promise.resolve(this._characteristic);

		console.log(lang('BLESrv_GATT_Connect'));
		return device.gatt
			?.connect()
			.then((server: BluetoothRemoteGATTServer) => {
				console.log(lang('BLESrv_Get_Service'));
				return server.getPrimaryService(BLUETOOTH_SERVICE_UUID);
			})
			.then((service: BluetoothRemoteGATTService) => {
				console.log(lang('BLESrv_Get_Characteristic'));
				return service.getCharacteristic(BLUETOOTH_CHARACTERISTIC_UUID);
			})
			.then((characteristic: BluetoothRemoteGATTCharacteristic) => {
				console.log(lang('BLESrv_Characteristic_Done'));
				characteristic.addEventListener('characteristicvaluechanged', (ev: any) =>
					this.handleCharacteristicValueChanged(ev)
				);
				// читаем версию протокола устройства (сообщение отправляется устройством сразу после подключения)
				characteristic?.readValue();
				this._characteristic = characteristic;
				return characteristic;
			});
	}

	/** Включение получения уведомлений об изменении характеристики */
	private startNotifications(
		characteristic: BluetoothRemoteGATTCharacteristic | undefined
	): Promise<void> | undefined {
		console.log(lang('BLESrv_Start_Notifications'));
		return characteristic?.startNotifications().then(() => {
			console.log(lang('BLESrv_Notifications_Done'));
			this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.CONNECT);
		});
	}

	/**
	 * Переподключение к Bluetooth устройству
	 * @param {number} max Максимальное кол. попыток подключения
	 * @param {number} delay Таймаут подключения, сек.
	 * @param {() => any} toTry Метод проверки подключения
	 * @param {(server: BluetoothRemoteGATTServer) => void} success Метод вызываемый при успешном подключении
	 * @param {() => void} fail Метод вызываемый при невозможности подключиться
	 */
	private exponentialBackoff(
		max: number,
		delay: number,
		toTry: () => any,
		success: (server: BluetoothRemoteGATTServer) => void,
		fail: () => void
	): void {
		toTry()
			.then((server: BluetoothRemoteGATTServer) => success(server))
			.catch(() => {
				if (max === 0) return fail();
				console.log(lang('BLESrv_Reconnect').replace('%', delay).replace('$', max));
				setTimeout(() => {
					this.exponentialBackoff(--max, delay * 2, toTry, success, fail);
				}, delay * 1000);
			});
	}

	/** Событие отключения от устройства Bluetooth */
	private handleDisconnection(): void {
		if (!this._device) return;

		// попытка подключиться повторно
		this.exponentialBackoff(
			3,
			2,
			() => {
				this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.WAIT_CONNECT);
				if (this._device) return this.connectDeviceAndCharacteristic(this._device);
			},
			() => {
				console.log(lang('BLESrv_Reconnect_Restored'));
				this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.CONNECT);
			},
			() => {
				console.log(lang('BLESrv_Connection_Lost'));
				this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
				this.clear();
			}
		);
	}

	/** Событие входящих данных */
	private handleCharacteristicValueChanged(ev: any): void {
		//console.log('receive', ev.target.value);

		console.log(lang('BLESrv_Receive').replace('%', ev.target.value.getUint8(0)));
		this.emit(BLUETOOTH_EVENT_RECEIVE, ev.target.value);
	}

	/**
	 * Отправить данные
	 * @param data Отправляемые данные
	 */
	send(data: DataView | undefined): Promise<any> {
		//console.log('send', data);

		if (!this.connected) {
			this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
			return Promise.resolve();
		}
		if (!data) {
			this.emit(BLUETOOTH_EVENT_SEND);
			return Promise.resolve();
		}

		console.log(lang('BLESrv_Send').replace('%', data?.getUint8(0) ?? '...'));
		return (
			this._characteristic?.writeValue(data).catch(() => {
				return Promise.resolve()
					.then(() => this.delayPromise(50))
					.then(() => this.send(data));
			}) ?? Promise.resolve()
		);
	}

	/**
	 * Таймаут Promise
	 * @param {number} timeout Время паузы, мс
	 * @param {T} arg Передаваемые аргументы
	 */
	private delayPromise<T>(timeout: number, arg?: T): Promise<T> {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout, arg);
		});
	}
}
