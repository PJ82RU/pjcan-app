import EventEmitter from 'eventemitter3';

export const BLUETOOTH_SERVICE_UUID = 'cc9e7b30-9834-488f-b762-aa62f5022dd4';
export const BLUETOOTH_CHARACTERISTIC_UUID = 'cc9e7b31-9834-488f-b762-aa62f5022dd4';
export const BLUETOOTH_SIZE_MAX = 512;

export const BLUETOOTH_EVENT_CONNECTED = 'Connected'; // Событие подключения
export const BLUETOOTH_EVENT_RECEIVE = 'Receive'; // Событие входящих данных

export enum EConnectedStatus {
	NO_CONNECT,
	CONNECT,
	WAIT_CONNECT
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
			return Promise.resolve(undefined);
		}

		return !!this._device
			? Promise.resolve()
			: this.requestBluetoothDevice()
					.then((device: BluetoothDevice) => this.connectDeviceAndCharacteristic(device))
					.then((characteristic: BluetoothRemoteGATTCharacteristic | undefined) =>
						this.startNotifications(characteristic)
					)
					.catch((e: any) => {
						this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
						console.log('Bluetooth.connect', e);
					});
	}

	/** Отключение от Bluetooth устройства */
	disconnect(): void {
		if (this._device) {
			this._device.gatt?.disconnect();
			this.clear();
		}
	}

	/** Запрос выбора Bluetooth устройства */
	requestBluetoothDevice(): Promise<BluetoothDevice> {
		return navigator.bluetooth
			.requestDevice({ filters: [{ services: [BLUETOOTH_SERVICE_UUID] }] })
			.then((device: BluetoothDevice) => {
				console.log(`Выбрано ${device.name} bluetooth устройство.`);
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

		console.log('Подключение к GATT серверу ...');
		return device.gatt
			?.connect()
			.then((server: BluetoothRemoteGATTServer) => {
				console.log('GATT сервер подключен, читаю сервис ...');
				return server.getPrimaryService(BLUETOOTH_SERVICE_UUID);
			})
			.then((service: BluetoothRemoteGATTService) => {
				console.log('Сервис получен, читаю характеристику ...');
				return service.getCharacteristic(BLUETOOTH_CHARACTERISTIC_UUID);
			})
			.then((characteristic: BluetoothRemoteGATTCharacteristic) => {
				console.log('Характеристика получена.');
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
		console.log('Запуск уведомлений ...');
		return characteristic?.startNotifications().then(() => {
			console.log('Уведомления запущены.');
			this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.CONNECT);
		});
	}

	/**
	 * Переподключение к Bluetooth устройству
	 * @param max     Максимальное кол. попыток подключения
	 * @param delay   Таймаут подключения, сек.
	 * @param toTry   Метод проверки подключения
	 * @param success Метод вызываемый при успешном подключении
	 * @param fail    Метод вызываемый при невозможности подключиться
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
				console.log('Повторная попытка через ' + delay + ' сек... (осталось ' + max + ' попыток)');
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
				console.log('Соединение с устройством Bluetooth PJCAN восстановлено.');
				this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.CONNECT);
			},
			() => {
				console.log('Связь с устройством Bluetooth PJCAN потеряна.');
				this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
				this.clear();
			}
		);
	}

	/** Событие входящих данных */
	private handleCharacteristicValueChanged(ev: any): void {
		console.log('Входящие данные: ID ' + ev.target.value.getUint8(0));
		this.emit(BLUETOOTH_EVENT_RECEIVE, ev.target.value);
	}

	/**
	 * Отправить данные
	 * @param data Отправляемые данные
	 */
	send(data: DataView | undefined): Promise<any> {
		//console.log('Исходящие данные: ID ' + data.getUint8(0));
		return data && !!this._characteristic
			? this._characteristic.writeValue(data).catch(() => {
					return Promise.resolve()
						.then(() => this.delayPromise(100))
						.then(() => this.send(data));
			  })
			: Promise.resolve(undefined);
	}

	/** Таймаут Promise */
	private delayPromise(timeout: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}
}
