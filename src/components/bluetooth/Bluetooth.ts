/* eslint-disable no-undef */
// noinspection JSUnusedGlobalSymbols

import EventEmitter from "eventemitter3";
import { t } from "@/lang";
import { TConnectedStatus } from "./TConnectedStatus";

export const BLUETOOTH_SERVICE_UUID = "cc9e7b30-9834-488f-b762-aa62f5022dd4";
export const BLUETOOTH_CHARACTERISTIC_UUID = "cc9e7b31-9834-488f-b762-aa62f5022dd4";
export const BLUETOOTH_SIZE_MAX = 512;

export const BLUETOOTH_EVENT_CONNECTED = "Connected"; // Событие подключения
export const BLUETOOTH_EVENT_RECEIVE = "Receive"; // Событие входящих данных
export const BLUETOOTH_EVENT_SEND = "Send"; // Событие исходящих данных

const dev = process.env.NODE_ENV === "development";

/** Bluetooth */
export class Bluetooth extends EventEmitter
{
	/** Объект устройства */
	private _device: BluetoothDevice | undefined;
	/** Характеристика устройства */
	private _characteristic: BluetoothRemoteGATTCharacteristic | undefined;

	constructor()
	{
		super();
		this.clear();
	}

	/** Очистка переменных */
	private clear(): void
	{
		this._device = undefined;
		this._characteristic = undefined;
	}

	/** Статус подключения */
	get connected(): boolean
	{
		return !!this._device?.gatt?.connected;
	}

	/** Запустить выбор Bluetooth устройства и подключиться к выбранному */
	connect(): Promise<void>
	{
		if (!navigator.bluetooth)
		{
			this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.NO_CONNECT);
			return Promise.resolve();
		}

		return this._device
			? Promise.resolve()
			: this.requestBluetoothDevice()
				.then((device: BluetoothDevice) => this.reconnect(device))
				.catch((e: any) =>
				{
					this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.NO_CONNECT);
					console.log(e);
				});
	}

	/**
	 * Переподключение к устройству
	 * @param {BluetoothDevice} device Объект устройства
	 */
	reconnect(device: BluetoothDevice): Promise<void> | undefined
	{
		return this.connectDeviceAndCharacteristic(device)
			?.then((characteristic: BluetoothRemoteGATTCharacteristic | undefined) =>
				this.delayPromise(250, characteristic)
			)
			.then((characteristic: BluetoothRemoteGATTCharacteristic | undefined) =>
				this.startNotifications(characteristic)
			);
	}

	/** Отключение от Bluetooth устройства */
	disconnect(): void
	{
		if (this._device)
		{
			const device = this._device;
			this.clear();
			device.gatt?.disconnect();

			if (dev) console.log(t("BLE.server.deviceDisconnected", { n: device.name }));
			this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.DISCONNECT);
		}
	}

	/** Запрос выбора Bluetooth устройства */
	requestBluetoothDevice(): Promise<BluetoothDevice>
	{
		return navigator.bluetooth
			.requestDevice({ filters: [{ services: [BLUETOOTH_SERVICE_UUID] }] })
			.then((device: BluetoothDevice) =>
			{
				if (dev) console.log(t("BLE.server.deviceSelected", { n: device.name }));
				// device.removeEventListener("gattserverdisconnected", null);
				device.addEventListener("gattserverdisconnected", () => this.handleDisconnection());
				this._device = device;
				return device;
			});
	}

	/** Подключение к определенному устройству, получение сервиса и характеристики */
	private connectDeviceAndCharacteristic(
		device: BluetoothDevice
	): Promise<BluetoothRemoteGATTCharacteristic> | undefined
	{
		if (device.gatt?.connected && !!this._characteristic) return Promise.resolve(this._characteristic);

		if (dev) console.log(t("BLE.server.GATTConnect"));
		return device.gatt
			?.connect()
			.then((server: BluetoothRemoteGATTServer) =>
			{
				if (dev) console.log(t("BLE.server.getService"));
				return server.getPrimaryService(BLUETOOTH_SERVICE_UUID);
			})
			.then((service: BluetoothRemoteGATTService) =>
			{
				if (dev) console.log(t("BLE.server.getCharacteristic"));
				return service.getCharacteristic(BLUETOOTH_CHARACTERISTIC_UUID);
			})
			.then((characteristic: BluetoothRemoteGATTCharacteristic) =>
			{
				if (dev) console.log(t("BLE.server.characteristicDone"));
				// characteristic.removeEventListener("characteristicvaluechanged", null);
				characteristic.addEventListener("characteristicvaluechanged", (ev: any) =>
					this.handleCharacteristicValueChanged(ev)
				);
				// запускает процесс чтения данных
				characteristic?.readValue();
				this._characteristic = characteristic;
				return characteristic;
			});
	}

	/** Включение получения уведомлений об изменении характеристики */
	private startNotifications(
		characteristic: BluetoothRemoteGATTCharacteristic | undefined
	): Promise<void> | undefined
	{
		if (dev) console.log(t("BLE.server.startNotifications"));
		return characteristic?.startNotifications().then(() =>
		{
			if (dev) console.log(t("BLE.server.notificationsDone"));
			this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.CONNECT);
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
	): void
	{
		toTry()
			.then((server: BluetoothRemoteGATTServer) => success(server))
			.catch(() =>
			{
				if (max === 0) return fail();
				if (dev) console.log(t("BLE.server.reconnect", { n: delay, c: max }));
				setTimeout(() =>
				{
					this.exponentialBackoff(--max, delay * 2, toTry, success, fail);
				}, delay * 1000);
			});
	}

	/** Событие отключения от устройства Bluetooth */
	private handleDisconnection(): void
	{
		if (!this._device) return;

		// попытка подключиться повторно
		this.exponentialBackoff(
			3,
			2,
			() =>
			{
				this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.WAIT_CONNECT);
				if (this._device) return this.reconnect(this._device);
			},
			() =>
			{
				if (dev) console.log(t("BLE.server.reconnectRestored"));
				// this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.CONNECT);
			},
			() =>
			{
				if (dev) console.log(t("BLE.server.connectionLost"));
				this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.NO_CONNECT);
				this.clear();
			}
		);
	}

	/** Событие входящих данных */
	private handleCharacteristicValueChanged(ev: any): void
	{
		const { value } = ev.target;
		if (value?.byteLength > 0)
		{
			if (dev) console.log(t("BLE.server.receive", { n: value.getUint8(0) }), value);
			this.emit(BLUETOOTH_EVENT_RECEIVE, value);
		}
	}

	/**
	 * Отправить данные
	 * @param data Отправляемые данные
	 */
	send(data: DataView | undefined): Promise<any>
	{
		if (!this.connected)
		{
			// this.emit(BLUETOOTH_EVENT_CONNECTED, TConnectedStatus.NO_CONNECT);
			return Promise.resolve();
		}
		if (!data)
		{
			this.emit(BLUETOOTH_EVENT_SEND);
			return Promise.resolve();
		}

		if (dev) console.log(t("BLE.server.send", { n: data?.getUint8(0) ?? "..." }), data);

		return (
			this._characteristic?.writeValue(data).catch(() =>
			{
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
	private delayPromise<T>(timeout: number, arg?: T): Promise<T>
	{
		return new Promise((resolve) =>
		{
			setTimeout(resolve, timeout, arg);
		});
	}
}
