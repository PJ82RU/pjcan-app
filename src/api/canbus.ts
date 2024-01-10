import EventEmitter from "eventemitter3";
import { toast } from "vue3-toastify";
import { t } from "@/lang";
import { getFirmware, getFirmwareVersion } from "@/api/firmware";
import { getSerial } from "@/api/hash";
import { createDebounce } from "@/utils/debounce";

import {
	BLUETOOTH_EVENT_CONNECTED,
	BLUETOOTH_EVENT_RECEIVE,
	Bluetooth,
	TConnectedStatus
} from "@/components/bluetooth";
import { IBaseModel } from "@/models/pjcan/base";
import {
	API_DEVICE_CONFIG_EXEC,
	API_DEVICE_CONFIG_EVENT,
	API_DEVICE_VALUE_EXEC,
	API_DEVICE_VALUE_EVENT,
	API_DEVICE_INFO_EXEC,
	API_DEVICE_INFO_EVENT,
	API_DEVICE_UPDATE_EXEC,
	API_DEVICE_UPDATE_EVENT,
	API_DEVICE_UPDATE_EVENT_ERROR,
	API_DEVICE_SCANNER_VALUE_EXEC,
	API_DEVICE_SCANNER_VALUE_EVENT,
	IDeviceAction,
	DeviceInfo,
	DeviceAction,
	DeviceConfig,
	DeviceValue,
	DeviceUpdate,
	DeviceScannerValue, IDeviceInfo
} from "@/models/pjcan/device";
import {
	API_BUTTONS_SW1_CONFIG_EXEC,
	API_BUTTONS_SW1_CONFIG_EVENT,
	API_BUTTON_SW1_VALUE_EXEC,
	API_BUTTON_SW1_VALUE_EVENT,
	API_BUTTONS_SW3_CONFIG_EXEC,
	API_BUTTONS_SW3_CONFIG_EVENT,
	API_BUTTON_SW3_VALUE_EXEC,
	API_BUTTON_SW3_VALUE_EVENT,
	ButtonValue,
	ButtonsConfig
} from "@/models/pjcan/buttons";
import {
	API_TEYES_CONFIG_EXEC,
	API_TEYES_CONFIG_EVENT,
	API_TEYES_TEXT_EXEC,
	API_TEYES_TEXT_EVENT,
	API_TEYES_TEXT_VIEW_EXEC,
	API_TEYES_TEXT_VIEW_EVENT,
	TeyesText,
	TeyesConfig
} from "@/models/pjcan/teyes";
import {
	API_MAZDA_CONFIG_EXEC,
	API_MAZDA_CONFIG_EVENT,
	API_MAZDA_VIEW_EXEC,
	API_MAZDA_VIEW_EVENT,
	MazdaConfig
} from "@/models/pjcan/mazda";
import {
	API_DATETIME_CONFIG_EVENT,
	API_DATETIME_CONFIG_EXEC,
	API_DATETIME_VIEW_EVENT,
	API_DATETIME_VIEW_EXEC,
	DatetimeConfig
} from "@/models/pjcan/datetime";
import {
	API_BOSE_CONFIG_EXEC,
	API_BOSE_CONFIG_EVENT,
	API_BOSE_VIEW_EXEC,
	API_BOSE_VIEW_EVENT,
	BoseConfig
} from "@/models/pjcan/bose";
import {
	API_CLIMATE_VALUE_EXEC,
	API_CLIMATE_VALUE_EVENT,
	API_CLIMATE_VIEW_EXEC,
	API_CLIMATE_VIEW_EVENT,
	ClimateValue
} from "@/models/pjcan/climate";
import {
	API_DOORS_VALUE_EXEC,
	API_DOORS_VALUE_EVENT,
	API_DOORS_VIEW_EXEC,
	API_DOORS_VIEW_EVENT,
	DoorsValue
} from "@/models/pjcan/doors";
import {
	API_ENGINE_CONFIG_EXEC,
	API_ENGINE_CONFIG_EVENT,
	API_ENGINE_VALUE_EXEC,
	API_ENGINE_VALUE_EVENT,
	API_ENGINE_VIEW_EXEC,
	API_ENGINE_VIEW_EVENT,
	API_ENGINE_VIEW_ENABLED_EXEC,
	API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC,
	API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC,
	API_ENGINE_VIEW_COOLANT_EXEC,
	API_ENGINE_VIEW_RPM_EXEC,
	API_ENGINE_VIEW_LOAD_EXEC,
	API_ENGINE_VIEW_THROTTLE_EXEC,
	API_ENGINE_VIEW_ENABLED_EVENT,
	API_ENGINE_VIEW_TOTAL_WORKTIME_EVENT,
	API_ENGINE_VIEW_TOTAL_COUNT_RPM_EVENT,
	API_ENGINE_VIEW_COOLANT_EVENT,
	API_ENGINE_VIEW_RPM_EVENT,
	API_ENGINE_VIEW_LOAD_EVENT,
	API_ENGINE_VIEW_THROTTLE_EVENT,
	EngineConfig,
	EngineValue,
	EngineViews
} from "@/models/pjcan/engine";
import {
	API_FUEL_CONFIG_EXEC,
	API_FUEL_CONFIG_EVENT,
	API_FUEL_VALUE_EXEC,
	API_FUEL_VALUE_EVENT,
	API_FUEL_VIEW_EXEC,
	API_FUEL_VIEW_EVENT,
	API_FUEL_VIEW_CURRENT_EXEC,
	API_FUEL_VIEW_AVG_EXEC,
	API_FUEL_VIEW_CURRENT_EVENT,
	API_FUEL_VIEW_AVG_EVENT,
	FuelConfig,
	FuelValue,
	FuelViews
} from "@/models/pjcan/fuel";
import {
	API_MOVEMENT_VALUE_EXEC,
	API_MOVEMENT_VALUE_EVENT,
	API_MOVEMENT_VIEW_EXEC,
	API_MOVEMENT_VIEW_EVENT,
	API_MOVEMENT_VIEW_SPEED_EXEC,
	API_MOVEMENT_VIEW_SPEED_EVENT,
	API_MOVEMENT_VIEW_SPEED_AVG_EXEC,
	API_MOVEMENT_VIEW_SPEED_AVG_EVENT,
	API_MOVEMENT_VIEW_REST_WAY_EXEC,
	API_MOVEMENT_VIEW_REST_WAY_EVENT,
	MovementValue,
	MovementViews
} from "@/models/pjcan/movement";
import {
	API_SENSORS_VALUE_EXEC,
	API_SENSORS_VALUE_EVENT,
	API_SENSORS_VIEW_EXEC,
	API_SENSORS_VIEW_EVENT,
	API_SENSORS_VIEW_HANDBRAKE_EXEC,
	API_SENSORS_VIEW_HANDBRAKE_EVENT,
	API_SENSORS_VIEW_REVERSE_EXEC,
	API_SENSORS_VIEW_REVERSE_EVENT,
	API_SENSORS_VIEW_SEATBELT_EXEC,
	API_SENSORS_VIEW_SEATBELT_EVENT,
	API_SENSORS_VIEW_TURN_SIGNAL_EXEC,
	API_SENSORS_VIEW_TURN_SIGNAL_EVENT,
	SensorsValue,
	SensorsViews
} from "@/models/pjcan/sensors";
import {
	API_TEMPERATURE_VALUE_EXEC,
	API_TEMPERATURE_VALUE_EVENT,
	API_TEMPERATURE_VIEW_EXEC,
	API_TEMPERATURE_VIEW_EVENT,
	TemperatureValue
} from "@/models/pjcan/temperature";
import {
	API_VOLUME_CONFIG_EXEC,
	API_VOLUME_CONFIG_EVENT,
	API_VOLUME_VIEW_EXEC,
	API_VOLUME_VIEW_EVENT,
	VolumeConfig
} from "@/models/pjcan/volume";
import { API_VERSION_EVENT, IVersion, Version } from "@/models/pjcan/version";

import { IQuery } from "@/models/interfaces/IQuery";
import { ViewConfig } from "@/models/pjcan/view";

export const API_CHOICE_EXEC = 0x10;

const dev = process.env.NODE_ENV === "development";

export class Canbus extends EventEmitter
{
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Версия прошивки PJCAN */
	version: IVersion = new Version();
	/** Статус активации устройства */
	activation: boolean = false;
	/** SHA */
	sha: string | undefined;

	/** Очередь */
	private queue: IQuery[] = [];
	/** Ожидание следующей очереди */
	private queueWait: boolean = false;
	/** Запрет на отправку данных */
	queueDisabled: boolean = false;

	/** Обновление прошивки */
	update = new DeviceUpdate();
	/** Таймер */
	private debounce = createDebounce();

	constructor()
	{
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (ev: any) => this.onConnected(ev));
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/** Отправка сообщений из очереди */
	private sendBluetoothQueue()
	{
		if (this.bluetooth.connected)
		{
			if (this.queueWait) return;

			this.queueWait = true;
			while (this.queue.length)
			{
				const next = this.queue[0];
				this.queue.shift();
				if (!this.queueDisabled || (this.queueDisabled && next.requestPriority))
				{
					this.bluetooth
						.send(next.data)
						.then(() =>
						{
							next.fn?.(true);
						})
						.catch((err) =>
						{
							next.fn?.(false);
							if (dev) console.log("Query:", err);
						})
						.finally(() =>
						{
							this.queueWait = false;
							this.sendBluetoothQueue();
						});
					return;
				}
			}
			this.queueWait = false;
		}
		else if (this.queue.length)
		{
			this.queue = [];
		}
	}

	/**
	 * Запрос/отправка данных
	 * @param {IBaseModel} obj Объект данных
	 * @param {boolean} request Только запрос данных
	 * @param {boolean} clear Очистить очередь
	 * @param {function} fn Функция обратного вызова
	 */
	query(obj: IBaseModel, request?: boolean, clear?: boolean, fn?: (success: boolean) => void)
	{
		if (clear) this.queue = [];
		this.queue.push({
			data: obj.get(request),
			requestPriority: obj.requestPriority,
			fn
		});
		this.sendBluetoothQueue();
	}

	/**
	 * Событие подключения Bluetooth
	 * @param {TConnectedStatus} status Статус подключения
	 */
	onConnected(status: TConnectedStatus)
	{
		if (status === TConnectedStatus.CONNECT)
		{
			// с начало получаем версию прошивки
			this.query(this.version, true, true);
			// далее получаем статус активации устройства
			this.query(new DeviceValue());
		}
	}

	/**
	 * Выборочные данные
	 * @param data Данные
	 */
	private choiceData(data: DataView): void
	{
		const data_size = data.getUint16(1, true);
		if (data_size === 0 || data_size + 3 > data.byteLength) return;

		let offset = 3;
		while (offset < data_size)
		{
			const size = data.getUint16(offset + 1, true);
			if (offset + size + 3 > data.byteLength) break;

			this.onReceive(new DataView(data.buffer.slice(offset, size + 3)));
			offset += size + 3;
		}
	};

	/**
	 * Входящие данные
	 * @param data Данные
	 */
	onReceive(data: DataView): void
	{
		const id = data.getUint8(0);
		if (id === 0)
		{
			// Версия прошивки
			this.version.set(data);
			const { major, minor, build, revision } = this.version;
			console.log(t("BLE.server.versionProtocol", { mj: major, mn: minor, bl: build, rv: revision }));
			this.emit(API_VERSION_EVENT, this.version);
		}
		else if (this.version.is)
		{
			switch (id)
			{
				case API_DEVICE_INFO_EXEC: {
					// Информация об устройстве
					const res = new DeviceInfo(data);
					if (res.isData && this.sha === undefined) this.getSHA(res);
					this.emit(API_DEVICE_INFO_EVENT, res);
					break;
				}
				case API_DEVICE_CONFIG_EXEC: // Конфигурация устройства
					this.emit(API_DEVICE_CONFIG_EVENT, new DeviceConfig(data));
					break;
				case API_DEVICE_VALUE_EXEC: {
					// Значения устройства
					const res = new DeviceValue(data);
					if (res.isData)
					{
						this.activation = res.activation;
						// для активации устройства получаем хеш устройства
						if (!this.activation && this.sha === undefined) this.query(new DeviceInfo());
					}
					this.emit(API_DEVICE_VALUE_EVENT, res);
					break;
				}
				case API_DEVICE_UPDATE_EXEC: // Обновление прошивки
					this.update.set(data);
					this.emit(API_DEVICE_UPDATE_EVENT, this.update);
					break;
				case API_DEVICE_SCANNER_VALUE_EXEC: // Значения сканирования
					this.emit(API_DEVICE_SCANNER_VALUE_EVENT, new DeviceScannerValue(data));
					break;

				case API_CHOICE_EXEC: // Выборочный запрос данных
					this.choiceData(data);
					break;

				case API_BUTTONS_SW1_CONFIG_EXEC: // Конфигурация кнопок SW1
					this.emit(API_BUTTONS_SW1_CONFIG_EVENT, new ButtonsConfig(API_BUTTONS_SW1_CONFIG_EXEC, data));
					break;
				case API_BUTTON_SW1_VALUE_EXEC: // Значения кнопки SW1
					this.emit(API_BUTTON_SW1_VALUE_EVENT, new ButtonValue(API_BUTTON_SW1_VALUE_EXEC, data));
					break;
				case API_BUTTONS_SW3_CONFIG_EXEC: // Конфигурация кнопок SW3
					this.emit(API_BUTTONS_SW3_CONFIG_EVENT, new ButtonsConfig(API_BUTTONS_SW3_CONFIG_EXEC, data));
					break;
				case API_BUTTON_SW3_VALUE_EXEC: // Значения кнопки SW3
					this.emit(API_BUTTON_SW3_VALUE_EVENT, new ButtonValue(API_BUTTON_SW3_VALUE_EXEC, data));
					break;

				case API_MAZDA_CONFIG_EXEC: // Конфигурация автомобиля
					this.emit(API_MAZDA_CONFIG_EVENT, new MazdaConfig(data));
					break;
				case API_MAZDA_VIEW_EXEC: // Конфигурация отображения текста приветствия
					this.emit(API_MAZDA_VIEW_EVENT, new ViewConfig(API_MAZDA_VIEW_EXEC, data));
					break;

				case API_DATETIME_CONFIG_EXEC: // Конфигурация времени
					this.emit(API_DATETIME_CONFIG_EVENT, new DatetimeConfig(data));
					break;
				case API_DATETIME_VIEW_EXEC: // Конфигурация отображения времени
					this.emit(API_DATETIME_VIEW_EVENT, new ViewConfig(API_DATETIME_VIEW_EXEC, data));
					break;

				case API_TEYES_CONFIG_EXEC: // Конфигурация Teyes
					this.emit(API_TEYES_CONFIG_EVENT, new TeyesConfig(data));
					break;
				case API_TEYES_TEXT_EXEC: // Текст Teyes
					this.emit(API_TEYES_TEXT_EVENT, new TeyesText(data));
					break;
				case API_TEYES_TEXT_VIEW_EXEC: // Параметры отображения Teyes
					this.emit(API_TEYES_TEXT_VIEW_EVENT, new ViewConfig(API_TEYES_TEXT_VIEW_EXEC, data));
					break;

				case API_BOSE_CONFIG_EXEC: // Конфигурация Bose
					this.emit(API_BOSE_CONFIG_EVENT, new BoseConfig(data));
					break;
				case API_BOSE_VIEW_EXEC: // Параметры отображения Bose
					this.emit(API_BOSE_VIEW_EVENT, new ViewConfig(API_BOSE_VIEW_EXEC, data));
					break;

				case API_CLIMATE_VALUE_EXEC: // Значения климат-контроля
					this.emit(API_CLIMATE_VALUE_EVENT, new ClimateValue(data));
					break;
				case API_CLIMATE_VIEW_EXEC: // Параметры отображения климат-контроля
					this.emit(API_CLIMATE_VIEW_EVENT, new ViewConfig(API_CLIMATE_VIEW_EXEC, data));
					break;

				case API_DOORS_VALUE_EXEC: // Значения дверей
					this.emit(API_DOORS_VALUE_EVENT, new DoorsValue(data));
					break;
				case API_DOORS_VIEW_EXEC: // Параметры отображения дверей
					this.emit(API_DOORS_VIEW_EVENT, new ViewConfig(API_DOORS_VIEW_EXEC, data));
					break;

				case API_ENGINE_CONFIG_EXEC: // Конфигурация ДВС
					this.emit(API_ENGINE_CONFIG_EVENT, new EngineConfig(data));
					break;
				case API_ENGINE_VALUE_EXEC: // Значения ДВС
					this.emit(API_ENGINE_VALUE_EVENT, new EngineValue(data));
					break;
				case API_ENGINE_VIEW_EXEC: // Параметры отображения ДВС
					this.emit(API_ENGINE_VIEW_EVENT, new EngineViews(data));
					break;
				case API_ENGINE_VIEW_ENABLED_EXEC:
					this.emit(API_ENGINE_VIEW_ENABLED_EVENT, new ViewConfig(API_ENGINE_VIEW_ENABLED_EXEC, data));
					break;
				case API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC:
					this.emit(API_ENGINE_VIEW_TOTAL_WORKTIME_EVENT, new ViewConfig(API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC, data));
					break;
				case API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC:
					this.emit(API_ENGINE_VIEW_TOTAL_COUNT_RPM_EVENT, new ViewConfig(API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC, data));
					break;
				case API_ENGINE_VIEW_COOLANT_EXEC:
					this.emit(API_ENGINE_VIEW_COOLANT_EVENT, new ViewConfig(API_ENGINE_VIEW_COOLANT_EXEC, data));
					break;
				case API_ENGINE_VIEW_RPM_EXEC:
					this.emit(API_ENGINE_VIEW_RPM_EVENT, new ViewConfig(API_ENGINE_VIEW_RPM_EXEC, data));
					break;
				case API_ENGINE_VIEW_LOAD_EXEC:
					this.emit(API_ENGINE_VIEW_LOAD_EVENT, new ViewConfig(API_ENGINE_VIEW_LOAD_EXEC, data));
					break;
				case API_ENGINE_VIEW_THROTTLE_EXEC:
					this.emit(API_ENGINE_VIEW_THROTTLE_EVENT, new ViewConfig(API_ENGINE_VIEW_THROTTLE_EXEC, data));
					break;

				case API_FUEL_CONFIG_EXEC: // Конфигурация расхода
					this.emit(API_FUEL_CONFIG_EVENT, new FuelConfig(data));
					break;
				case API_FUEL_VALUE_EXEC: // Значения расхода
					this.emit(API_FUEL_VALUE_EVENT, new FuelValue(data));
					break;
				case API_FUEL_VIEW_EXEC: // Параметры отображения расхода
					this.emit(API_FUEL_VIEW_EVENT, new FuelViews(data));
					break;
				case API_FUEL_VIEW_CURRENT_EXEC:
					this.emit(API_FUEL_VIEW_CURRENT_EVENT, new ViewConfig(API_FUEL_VIEW_CURRENT_EXEC, data));
					break;
				case API_FUEL_VIEW_AVG_EXEC:
					this.emit(API_FUEL_VIEW_AVG_EVENT, new ViewConfig(API_FUEL_VIEW_AVG_EXEC, data));
					break;

				case API_MOVEMENT_VALUE_EXEC: // Значения движения
					this.emit(API_MOVEMENT_VALUE_EVENT, new MovementValue(data));
					break;
				case API_MOVEMENT_VIEW_EXEC: // Параметры отображения движения
					this.emit(API_MOVEMENT_VIEW_EVENT, new MovementViews(data));
					break;
				case API_MOVEMENT_VIEW_SPEED_EXEC:
					this.emit(API_MOVEMENT_VIEW_SPEED_EVENT, new ViewConfig(API_MOVEMENT_VIEW_SPEED_EXEC, data));
					break;
				case API_MOVEMENT_VIEW_SPEED_AVG_EXEC:
					this.emit(API_MOVEMENT_VIEW_SPEED_AVG_EVENT, new ViewConfig(API_MOVEMENT_VIEW_SPEED_AVG_EXEC, data));
					break;
				case API_MOVEMENT_VIEW_REST_WAY_EXEC:
					this.emit(API_MOVEMENT_VIEW_REST_WAY_EVENT, new ViewConfig(API_MOVEMENT_VIEW_REST_WAY_EXEC, data));
					break;

				case API_SENSORS_VALUE_EXEC: // Значения датчиков
					this.emit(API_SENSORS_VALUE_EVENT, new SensorsValue(data));
					break;
				case API_SENSORS_VIEW_EXEC: // Параметры отображения датчиков
					this.emit(API_SENSORS_VIEW_EVENT, new SensorsViews(data));
					break;
				case API_SENSORS_VIEW_HANDBRAKE_EXEC:
					this.emit(API_SENSORS_VIEW_HANDBRAKE_EVENT, new ViewConfig(API_SENSORS_VIEW_HANDBRAKE_EXEC, data));
					break;
				case API_SENSORS_VIEW_REVERSE_EXEC:
					this.emit(API_SENSORS_VIEW_REVERSE_EVENT, new ViewConfig(API_SENSORS_VIEW_REVERSE_EXEC, data));
					break;
				case API_SENSORS_VIEW_SEATBELT_EXEC:
					this.emit(API_SENSORS_VIEW_SEATBELT_EVENT, new ViewConfig(API_SENSORS_VIEW_SEATBELT_EXEC, data));
					break;
				case API_SENSORS_VIEW_TURN_SIGNAL_EXEC:
					this.emit(API_SENSORS_VIEW_TURN_SIGNAL_EVENT, new ViewConfig(API_SENSORS_VIEW_TURN_SIGNAL_EXEC, data));
					break;

				case API_TEMPERATURE_VALUE_EXEC: // Значения температуры
					this.emit(API_TEMPERATURE_VALUE_EVENT, new TemperatureValue(data));
					break;
				case API_TEMPERATURE_VIEW_EXEC: // Параметры отображения температуры
					this.emit(API_TEMPERATURE_VIEW_EVENT, new ViewConfig(API_TEMPERATURE_VIEW_EXEC, data));
					break;

				case API_VOLUME_CONFIG_EXEC: // Конфигурация уровня звука
					this.emit(API_VOLUME_CONFIG_EVENT, new VolumeConfig(data));
					break;
				case API_VOLUME_VIEW_EXEC: // Параметры отображения уровня звука
					this.emit(API_VOLUME_VIEW_EVENT, new ViewConfig(API_VOLUME_VIEW_EXEC, data));
					break;
			}
		}
	}

	/** Запустить процесс загрузки прошивки на устройство */
	updateStart(): void
	{
		getFirmware(this.update.firmwareUrl)
			.then((res: any) =>
			{
				if (res?.byteLength > 0)
				{
					this.update.firmwareData = new Uint8Array(res);
					this.update.total = res.byteLength;
					this.update.offset = 0;
					this.update.error = 0;
					this.update.encrypt = this.update.iv;
					setTimeout(() => this.updateUpload(), 1000);
				}
			})
			.catch(() => this.emit(API_DEVICE_UPDATE_EVENT_ERROR, t("update.notify.errorDownload")));
	}

	/** Пишем данные файла прошивки в устройство PJCAN */
	async updateUpload()
	{
		if (
			this.bluetooth.connected &&
			this.update.error === 0 &&
			this.update.offset <= this.update.total
		)
		{
			this.queueDisabled = true;
			await this.bluetooth.send(this.update.get());
		}
		else if (this.update.error !== 0)
		{
			this.queueDisabled = false;
		}

		if (this.update.end)
		{
			this.debounce(() => this.emit(API_DEVICE_UPDATE_EVENT_ERROR, t("update.notify.errorWaitUpdate")), 60000);
		}
		else
		{
			this.debounce(() => this.emit(API_DEVICE_UPDATE_EVENT_ERROR, t("update.notify.errorUpload")), 5000);
		}
	}

	/** Проверить версию прошивки */
	checkVersion(): Promise<IVersion>
	{
		return new Promise((resolve, reject) =>
		{
			getFirmwareVersion()
				.then((res: any) =>
				{
					this.update.firmwareUrl = res?.url ?? "";
					this.update.setIV(res?.iv);

					// проверяем версию прошивки
					if (res.current?.length === 4)
					{
						const ver = res.current;
						const newVersion: IVersion = new Version();
						newVersion.major = ver[0];
						newVersion.minor = ver[1];
						newVersion.build = ver[2];
						newVersion.revision = ver[3];

						if (this.version.compare(newVersion, 4) > 0) resolve(newVersion);
						else reject("Current version");
					}
					else reject("No data");
				})
				.catch((e) => reject(e));
		});
	}

	/**
	 * Перезагрузить устройство
	 * @param {boolean} save Сохранить настройки перед загрузкой
	 * @param {boolean} resetConfig Сбросить конфигурацию устройства
	 * @param {boolean} resetView Сбросить параметры отображения
	 */
	rebootDevice(save: boolean = false, resetConfig: boolean = false, resetView: boolean = false)
	{
		const action: IDeviceAction = new DeviceAction();
		action.reboot = true;
		action.save = save;
		action.resetConfig = resetConfig;
		action.resetView = resetView;
		if (resetConfig || resetView) this.sha = undefined;
		this.query(action);
	}

	private getSHA(info: IDeviceInfo): void
	{
		this.sha = "";
		info.sha.forEach((x) =>
		{
			const hex = x.toString(16);
			this.sha += (hex.length === 1 ? "0" : "") + hex;
		});

		if (!this.activation)
		{
			getSerial(this.sha)
				.then((res: any) =>
				{
					if (res?.sha?.length)
					{
						const device = new DeviceConfig();
						device.serial = res.sha;
						this.query(device, false, false, (success) =>
						{
							if (success)
							{
								this.rebootDevice(true);
								toast.success(t("activation.success"));
							}
							else
							{
								this.sha = undefined;
								toast.error(t("activation.error"));
							}
						});
					}
					else
					{
						this.sha = undefined;
						toast.error(t("activation.error"));
					}
				})
				.catch(() =>
				{
					this.sha = undefined;
					toast.error(t("activation.error"));
				});
		}
	}
}

const canbus = new Canbus();
export default canbus;
