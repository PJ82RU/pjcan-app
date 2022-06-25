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
	private device: any; // объект устройства
	private characteristic: any; // характеристика

	constructor() {
		super();
		this.clear();
	}

	/** Очистка переменных */
	private clear(): void {
		this.device = null;
		this.characteristic = null;
	}

	/** Статус подключения */
	public get connected(): boolean {
		return this.device !== null && this.characteristic !== null;
	}

	/** Запустить выбор Bluetooth устройства и подключиться к выбранному */
	public connect() {
		return this.device
			? Promise.resolve(this.device)
			: this.requestBluetoothDevice()
					.then((device: any) => this.connectDeviceAndCharacteristic(device))
					.then((characteristic: any) => this.startNotifications(characteristic))
					.catch((e: any) => {
						this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.NO_CONNECT);
						console.log(e);
					});
	}

	/** Отключение от Bluetooth устройства */
	public disconnect() {
		if (this.device) {
			this.device.gatt.disconnect();
			this.clear();
		}
	}

	/** Запрос выбора Bluetooth устройства */
	public requestBluetoothDevice() {
		//@ts-ignore
		return navigator.bluetooth
			.requestDevice({ filters: [{ services: [BLUETOOTH_SERVICE_UUID] }] })
			.then((device: any) => {
				console.log(`Выбрано ${device.name} bluetooth устройство.`);

				this.device = device;
				// noinspection SpellCheckingInspection
				this.device.addEventListener('gattserverdisconnected', () => this.handleDisconnection());
				return this.device;
			});
	}

	/** Подключение к определенному устройству, получение сервиса и характеристики */
	private connectDeviceAndCharacteristic(device: any) {
		if (device.gatt.connected && this.characteristic) return Promise.resolve(this.characteristic);

		console.log('Подключение к GATT серверу ...');
		return device.gatt
			.connect()
			.then((server: any) => {
				console.log('GATT сервер подключен, читаю сервис ...');
				return server.getPrimaryService(BLUETOOTH_SERVICE_UUID);
			})
			.then((service: any) => {
				console.log('Сервис получен, читаю характеристику ...');
				return service.getCharacteristic(BLUETOOTH_CHARACTERISTIC_UUID);
			})
			.then((characteristic: any) => {
				console.log('Характеристика получена.');
				this.characteristic = characteristic;
				// noinspection SpellCheckingInspection
				this.characteristic.addEventListener('characteristicvaluechanged', (event: any) =>
					this.handleCharacteristicValueChanged(event)
				);
				// читаем версию протокола устройства (сообщение отправляется устройством сразу после подключения)
				this.characteristic.readValue();
				return this.characteristic;
			});
	}

	/** Включение получения уведомлений об изменении характеристики */
	private startNotifications(characteristic: any) {
		console.log('Запуск уведомлений ...');
		return characteristic.startNotifications(characteristic).then(() => {
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
		success: (server: any) => void,
		fail: () => void
	) {
		toTry()
			.then((server: any) => success(server))
			.catch(() => {
				if (max === 0) return fail();
				console.log('Повторная попытка через ' + delay + ' сек... (осталось ' + max + ' попыток)');
				setTimeout(() => {
					this.exponentialBackoff(--max, delay * 2, toTry, success, fail);
				}, delay * 1000);
			});
	}

	/** Событие отключения от устройства Bluetooth */
	private handleDisconnection() {
		if (this.device) {
			// попытка подключиться повторно
			this.exponentialBackoff(
				3,
				2,
				() => {
					this.emit(BLUETOOTH_EVENT_CONNECTED, EConnectedStatus.WAIT_CONNECT);
					return this.connectDeviceAndCharacteristic(this.device);
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
	}

	/** Событие входящих данных */
	private handleCharacteristicValueChanged(event: any) {
		console.log('Входящие данные: ID ' + event.target.value.getUint8(0));
		this.emit(BLUETOOTH_EVENT_RECEIVE, event.target.value);
	}

	/**
	 * Отправить данные
	 * @param data Отправляемые данные
	 */
	public send(data: DataView | undefined) {
		//console.log('Исходящие данные: ID ' + data.getUint8(0));
		return data && this.connected
			? this.characteristic.writeValue(data).catch(() => {
					return Promise.resolve()
						.then(() => this.delayPromise(100))
						.then(() => this.send(data));
			  })
			: Promise.resolve(null);
	}

	/** Таймаут Promise */
	private delayPromise(timeout: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}
}
