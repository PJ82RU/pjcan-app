import EventEmitter from "eventemitter3";
import { t } from "@/lang";
import { clearDebounce, debounce } from "@/utils/debounce";
import { getFirmware, getFirmwareVersion } from "@/api/firmware";

import {
	BLUETOOTH_EVENT_CONNECTED,
	BLUETOOTH_EVENT_RECEIVE,
	Bluetooth,
	TConnectedStatus
} from "@/components/bluetooth";
import { IBaseModel } from "@/models/pjcan/base";
import { API_EXEC_CONFIG, Configs, IConfigs } from "@/models/pjcan/configs";
import { API_EXEC_VIEW, Views, IViews } from "@/models/pjcan/views";
import { API_EXEC_VARIABLE_CONFIG, IVariableConfigs } from "@/models/pjcan/variables/configs";
import { API_EXEC_VARIABLE_VIEW, IVariableViews } from "@/models/pjcan/variables/views";
import {
	API_EXEC_DEVICE_CONFIG,
	API_EXEC_DEVICE_VALUE,
	API_EXEC_INFO,
	DeviceInfo,
	IDeviceInfo
} from "@/models/pjcan/device";
import { API_EXEC_BUTTONS_CONFIG, API_EXEC_BUTTONS_VALUE, ButtonValue, IButtonValue } from "@/models/pjcan/button";
import {
	API_EXEC_TEYES_CONFIG,
	API_EXEC_TEYES_TEXT,
	API_EXEC_TEYES_VIEW,
	ITeyesText,
	TeyesText
} from "@/models/pjcan/teyes";
import { API_EXEC_LCD_VALUE } from "@/models/pjcan/lcd";
import { API_EXEC_CAR_CONFIG, API_EXEC_CAR_VIEW } from "@/models/pjcan/car";
import { API_EXEC_UPDATE_BEGIN_GZ, API_EXEC_UPDATE_UPLOAD_GZ, UpdateBegin, UpdateData } from "@/models/pjcan/update";
import { API_EXEC_VARIABLE_BOSE, API_EXEC_VARIABLE_BOSE_VIEW } from "@/models/pjcan/variables/bose";
import { API_EXEC_VARIABLE_CLIMATE, API_EXEC_VARIABLE_CLIMATE_VIEW } from "@/models/pjcan/variables/climate";
import { API_EXEC_VARIABLE_DOORS, API_EXEC_VARIABLE_DOORS_VIEW } from "@/models/pjcan/variables/doors";
import {
	API_EXEC_VARIABLE_ENGINE,
	API_EXEC_VARIABLE_ENGINE_CONFIG,
	API_EXEC_VARIABLE_ENGINE_VIEW
} from "@/models/pjcan/variables/engine";
import {
	API_EXEC_VARIABLE_FUEL,
	API_EXEC_VARIABLE_FUEL_CONFIG,
	API_EXEC_VARIABLE_FUEL_VIEW
} from "@/models/pjcan/variables/fuel";
import { API_EXEC_VARIABLE_MOVEMENT, API_EXEC_VARIABLE_MOVEMENT_VIEW } from "@/models/pjcan/variables/movement";
import { API_EXEC_VARIABLE_SENSORS, API_EXEC_VARIABLE_SENSORS_VIEW } from "@/models/pjcan/variables/sensors";
import {
	API_EXEC_VARIABLE_TEMPERATURE,
	API_EXEC_VARIABLE_TEMPERATURE_VIEW
} from "@/models/pjcan/variables/temperature";
import {
	API_EXEC_VARIABLE_VOLUME,
	API_EXEC_VARIABLE_VOLUME_CONFIG,
	API_EXEC_VARIABLE_VOLUME_VIEW
} from "@/models/pjcan/variables/volume";
import { IValues, Values } from "@/models/pjcan/values";
import { IVariablesValue } from "@/models/pjcan/variables/values";
import { API_EXEC_VALUE } from "@/models/pjcan/values/Values";
import { API_EXEC_VARIABLE_VALUE } from "@/models/pjcan/variables/values/VariablesValue";
import { IUpdateResult } from "@/models/pjcan/update/IUpdateResult";
import { IVersion, Version } from "@/models/pjcan/version";

export const API_EVENT_CONFIGS = "Configs";
export const API_EVENT_VIEWS = "Views";
export const API_EVENT_VALUES = "Values";

export const API_EVENT_VARIABLE_CONFIGS = "VariableConfigs";
export const API_EVENT_VARIABLE_VIEWS = "VariableViews";
export const API_EVENT_VARIABLE_VALUES = "VariableValues";

export const API_EVENT_BUTTONS_CONFIG = "ButtonsConfig";
export const API_EVENT_BUTTON = "ButtonsValue";

export const API_EVENT_CAR_CONFIG = "CarConfig";
export const API_EVENT_CAR_VIEW = "CarView";

export const API_EVENT_DEVICE_CONFIG = "DeviceConfig";
export const API_EVENT_DEVICE = "DeviceValue";
export const API_EVENT_INFO = "Info";

export const API_EVENT_LCD = "LCDValue";
export const API_EVENT_TEYES_CONFIG = "TeyesConfig";
export const API_EVENT_TEYES_VIEW = "TeyesView";
export const API_EVENT_TEYES_TEXT = "TeyesText";

export const API_EVENT_VARIABLE_BOSE = "VariableBoseConfig";
export const API_EVENT_VARIABLE_BOSE_VIEW = "VariableBoseView";

export const API_EVENT_VARIABLE_CLIMATE_VIEW = "VariableClimateView";
export const API_EVENT_VARIABLE_CLIMATE = "VariableClimateValue";

export const API_EVENT_VARIABLE_DOORS_VIEW = "VariableDoorsView";
export const API_EVENT_VARIABLE_DOORS = "VariableDoorsValue";

export const API_EVENT_VARIABLE_ENGINE_CONFIG = "VariableEngineConfig";
export const API_EVENT_VARIABLE_ENGINE_VIEW = "VariableEngineView";
export const API_EVENT_VARIABLE_ENGINE = "VariableEngineValue";

export const API_EVENT_VARIABLE_FUEL_CONFIG = "VariableFuelConfig";
export const API_EVENT_VARIABLE_FUEL_VIEW = "VariableFuelView";
export const API_EVENT_VARIABLE_FUEL = "VariableFuelValue";

export const API_EVENT_VARIABLE_MOVEMENT_VIEW = "VariableMovementView";
export const API_EVENT_VARIABLE_MOVEMENT = "VariableMovementValue";

export const API_EVENT_VARIABLE_SENSORS_VIEW = "VariableSensorsView";
export const API_EVENT_VARIABLE_SENSORS = "VariableSensorsValue";

export const API_EVENT_VARIABLE_TEMPERATURE_VIEW = "VariableTemperatureView";
export const API_EVENT_VARIABLE_TEMPERATURE = "VariableTemperatureValue";

export const API_EVENT_VARIABLE_VOLUME = "VariableVolumeValue";
export const API_EVENT_VARIABLE_VOLUME_CONFIG = "VariableVolumeConfig";
export const API_EVENT_VARIABLE_VOLUME_VIEW = "VariableVolumeView";

export const API_EVENT_UPDATE_UPLOAD_GZ = "UpdateUploadGZ";
export const API_EVENT_UPDATE_BEGIN_GZ = "UpdateBeginGZ";
export const API_EVENT_UPDATE_ERROR = "ErrorUpdate";

export class Canbus extends EventEmitter
{
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Конфигурация устройства */
	configs: IConfigs = new Configs();
	/** Конфигурация отображения значений */
	views: IViews = new Views();
	/** Значения */
	values: IValues = new Values();

	/** Устройство */
	deviceInfo: IDeviceInfo = new DeviceInfo();

	/** Обновление прошивки */
	update: IUpdateResult = {
		upload: new UpdateData(),
		begin: new UpdateBegin()
	};

	/** Значения кнопки */
	buttonValue: IButtonValue = new ButtonValue();
	/** Текст Teyes */
	teyesText: ITeyesText = new TeyesText();

	/** Запрет на отправку данных */
	private queryDisabled: boolean = true;

	/** Последний promise */
	private promises: Promise<void>[] | null = null;
	private queue: Promise<void>[] = [];
	/** Таймер */
	private debounceFetchValue: boolean = false;

	constructor()
	{
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (ev: any) => this.onConnected(ev));
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/**
	 * Запрос/отправка данных
	 * @param {IBaseModel} obj Объект данных
	 * @private
	 */
	private async query(obj: IBaseModel)
	{
		if (!this.bluetooth.connected) return;

		this.queue.push(this.bluetooth.send(obj.get()));
		if (!this.promises)
		{
			this.promises = this.queue;
			this.queue = [];
			await Promise.all(this.promises);
			this.promises = null;
		}
	}

	/**
	 * Событие подключения Bluetooth
	 * @param {TConnectedStatus} status Статус подключения
	 */
	async onConnected(status: TConnectedStatus)
	{
		if (status !== TConnectedStatus.CONNECT)
		{
			this.queryDisabled = true;
			return;
		}

		await this.queryConfig();
		await this.queryView();
		await this.queryDeviceInfo();
		this.queryDisabled = false;
	}

	/**
	 * Отправить/получить конфигурацию
	 * @param {number} type Тип конфигурации
	 */
	async queryConfig(type: number = 0)
	{
		switch (type)
		{
			case API_EXEC_VARIABLE_CONFIG:
				await this.query(this.configs.variable);
				break;

			case API_EXEC_BUTTONS_CONFIG:
				if (!this.queryDisabled) await this.query(this.configs.buttons);
				break;

			case API_EXEC_CAR_CONFIG:
				await this.query(this.configs.car);
				break;

			case API_EXEC_DEVICE_CONFIG:
				await this.query(this.configs.device);
				break;

			case API_EXEC_TEYES_CONFIG:
				await this.query(this.configs.teyes);
				break;

			case API_EXEC_VARIABLE_BOSE:
				await this.query(this.configs.variable.bose);
				break;

			case API_EXEC_VARIABLE_ENGINE_CONFIG:
				await this.query(this.configs.variable.engine);
				break;

			case API_EXEC_VARIABLE_FUEL_CONFIG:
				await this.query(this.configs.variable.fuel);
				break;

			case API_EXEC_VARIABLE_VOLUME_CONFIG:
				await this.query(this.configs.variable.volume);
				break;

			default:
				await this.query(this.configs);
				break;
		}
	}

	/**
	 * Отправить/получить конфигурацию отображения значений
	 * @param {number} type Тип конфигурации отображения значений
	 */
	async queryView(type: number = 0)
	{
		switch (type)
		{
			case API_EXEC_VARIABLE_VIEW:
				await this.query(this.views.variable);
				break;

			case API_EXEC_CAR_VIEW:
				if (!this.queryDisabled) await this.query(this.views.car);
				break;

			case API_EXEC_TEYES_VIEW:
				if (!this.queryDisabled) await this.query(this.views.teyes);
				break;

			case API_EXEC_VARIABLE_BOSE_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.bose);
				break;

			case API_EXEC_VARIABLE_CLIMATE_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.climate);
				break;

			case API_EXEC_VARIABLE_DOORS_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.doors);
				break;

			case API_EXEC_VARIABLE_ENGINE_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.engine);
				break;

			case API_EXEC_VARIABLE_FUEL_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.fuel);
				break;

			case API_EXEC_VARIABLE_MOVEMENT_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.movement);
				break;

			case API_EXEC_VARIABLE_SENSORS_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.sensors);
				break;

			case API_EXEC_VARIABLE_TEMPERATURE_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.temperature);
				break;

			case API_EXEC_VARIABLE_VOLUME_VIEW:
				if (!this.queryDisabled) await this.query(this.views.variable.volume);
				break;

			default:
				await this.query(this.views);
				break;
		}
	}

	/** Отправить/получить значения
	 * @param {number} type Тип значения
	 */
	async queryValue(type: number = 0)
	{
		if (this.queryDisabled) return;

		switch (type)
		{
			case API_EXEC_VARIABLE_VALUE:
				await this.query(this.values.variable);
				break;

			case API_EXEC_DEVICE_VALUE:
				await this.query(this.values.device);
				break;

			case API_EXEC_LCD_VALUE:
				await this.query(this.values.lcd);
				break;

			case API_EXEC_VARIABLE_CLIMATE:
				await this.query(this.values.variable.climate);
				break;

			case API_EXEC_VARIABLE_DOORS:
				await this.query(this.values.variable.doors);
				break;

			case API_EXEC_VARIABLE_ENGINE:
				await this.query(this.values.variable.engine);
				break;

			case API_EXEC_VARIABLE_FUEL:
				await this.query(this.values.variable.fuel);
				break;

			case API_EXEC_VARIABLE_MOVEMENT:
				await this.query(this.values.variable.movement);
				break;

			case API_EXEC_VARIABLE_SENSORS:
				await this.query(this.values.variable.sensors);
				break;

			case API_EXEC_VARIABLE_TEMPERATURE:
				await this.query(this.values.variable.temperature);
				break;

			case API_EXEC_VARIABLE_VOLUME:
				await this.query(this.values.variable.volume);
				break;

			default:
				await this.query(this.values);
				break;
		}
	}

	/** Получить информацию устройства */
	async queryDeviceInfo()
	{
		await this.query(this.deviceInfo);
	}

	/**
	 * Запустить циклический запрос значений
	 * @param {number} timeout Пауза между ответом и запросом
	 */
	startFetchValue(timeout: number = 500)
	{
		this.debounceFetchValue = true;
		debounce(async () =>
		{
			await this.queryValue();
			if (this.debounceFetchValue) this.startFetchValue(timeout);
		}, timeout);
	}

	/** Остановить циклический запрос значений */
	stopFetchValue()
	{
		this.debounceFetchValue = false;
		clearDebounce();
	}

	/**
	 * Событие входящих значений конфигурации
	 * @param {IVariableConfigs} config Конфигурация
	 */
	private emitVariableConfigs(config: IVariableConfigs): void
	{
		this.emit(API_EVENT_VARIABLE_CONFIGS, config);
		this.emit(API_EVENT_VARIABLE_BOSE, config.bose);
		this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, config.engine);
		this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, config.fuel);
		this.emit(API_EVENT_VARIABLE_VOLUME_CONFIG, config.volume);
	}

	/**
	 * Событие входящих значений отображения
	 * @param {IVariableViews} view Параметры отображения
	 */
	private emitVariableViews(view: IVariableViews): void
	{
		this.emit(API_EVENT_VARIABLE_VIEWS, view);
		this.emit(API_EVENT_VARIABLE_BOSE_VIEW, view.bose);
		this.emit(API_EVENT_VARIABLE_CLIMATE_VIEW, view.climate);
		this.emit(API_EVENT_VARIABLE_DOORS_VIEW, view.doors);
		this.emit(API_EVENT_VARIABLE_ENGINE_VIEW, view.engine);
		this.emit(API_EVENT_VARIABLE_FUEL_VIEW, view.fuel);
		this.emit(API_EVENT_VARIABLE_MOVEMENT_VIEW, view.movement);
		this.emit(API_EVENT_VARIABLE_SENSORS_VIEW, view.sensors);
		this.emit(API_EVENT_VARIABLE_TEMPERATURE_VIEW, view.temperature);
		this.emit(API_EVENT_VARIABLE_VOLUME_VIEW, view.volume);
	}

	/**
	 * Событие входящих значений
	 * @param {IVariablesValue} value Значения
	 */
	private emitVariableValues(value: IVariablesValue): void
	{
		this.emit(API_EVENT_VARIABLE_VALUES, value);
		this.emit(API_EVENT_VARIABLE_CLIMATE, value.climate);
		this.emit(API_EVENT_VARIABLE_DOORS, value.doors);
		this.emit(API_EVENT_VARIABLE_ENGINE, value.engine);
		this.emit(API_EVENT_VARIABLE_FUEL, value.fuel);
		this.emit(API_EVENT_VARIABLE_MOVEMENT, value.movement);
		this.emit(API_EVENT_VARIABLE_SENSORS, value.sensors);
		this.emit(API_EVENT_VARIABLE_TEMPERATURE, value.temperature);
		this.emit(API_EVENT_VARIABLE_VOLUME, value.volume);
	}

	/**
	 * Входящие данные
	 * @param data Данные
	 */
	onReceive(data: DataView): void
	{
		switch (data.getUint8(0))
		{
			case API_EXEC_CONFIG: // Вся конфигурация
				this.configs.set(data);
				this.logVersion();

				this.emit(API_EVENT_CONFIGS, this.configs);
				this.emit(API_EVENT_DEVICE_CONFIG, this.configs.device);
				this.emit(API_EVENT_BUTTONS_CONFIG, this.configs.buttons);
				this.emit(API_EVENT_CAR_CONFIG, this.configs.car);
				this.emit(API_EVENT_TEYES_CONFIG, this.configs.teyes);
				this.emitVariableConfigs(this.configs.variable);
				break;

			case API_EXEC_VIEW: // Все параметры отображения
				this.views.set(data);

				this.emit(API_EVENT_VIEWS, this.views);
				this.emit(API_EVENT_CAR_VIEW, this.views.car);
				this.emit(API_EVENT_TEYES_VIEW, this.views.teyes);
				this.emitVariableViews(this.views.variable);
				break;

			case API_EXEC_VALUE: // Все значения
				this.values.set(data);

				this.emit(API_EVENT_VALUES, this.values);
				this.emit(API_EVENT_DEVICE, this.values.device);
				this.emit(API_EVENT_LCD, this.values.lcd);
				this.emitVariableValues(this.values.variable);
				break;

			case API_EXEC_INFO: // Информация об устройстве
				this.deviceInfo.set(data);
				this.emit(API_EVENT_INFO, this.deviceInfo);
				break;
			case API_EXEC_DEVICE_CONFIG: // Конфигурация устройства
				this.configs.device.set(data);
				this.emit(API_EVENT_DEVICE_CONFIG, this.configs.device);
				break;
			case API_EXEC_DEVICE_VALUE: // Значения устройства
				this.values.device.set(data);
				this.emit(API_EVENT_DEVICE, this.values.device);
				break;

			case API_EXEC_BUTTONS_CONFIG: // Конфигурация кнопок
				this.configs.buttons.set(data);
				this.emit(API_EVENT_BUTTONS_CONFIG, this.configs.buttons);
				break;
			case API_EXEC_BUTTONS_VALUE: // Значения кнопки
				this.buttonValue.set(data);
				this.emit(API_EVENT_BUTTON, this.buttonValue);
				break;

			case API_EXEC_TEYES_CONFIG: // Конфигурация Teyes
				this.configs.teyes.set(data);
				this.emit(API_EVENT_TEYES_CONFIG, this.configs.teyes);
				break;
			case API_EXEC_TEYES_VIEW: // Параметры отображения Teyes
				this.views.teyes.set(data);
				this.emit(API_EVENT_TEYES_VIEW, this.views.teyes);
				break;
			case API_EXEC_TEYES_TEXT: // Текст Teyes
				this.teyesText.set(data);
				this.emit(API_EVENT_TEYES_TEXT, this.teyesText);
				break;

			case API_EXEC_LCD_VALUE: // Значения LCD
				this.values.lcd.set(data);
				this.emit(API_EVENT_LCD, this.values.lcd);
				break;

			case API_EXEC_CAR_CONFIG: // Конфигурация машины
				this.configs.car.set(data);
				this.emit(API_EVENT_CAR_CONFIG, this.configs.car);
				break;
			case API_EXEC_CAR_VIEW: // Параметры отображения машины
				this.views.car.set(data);
				this.emit(API_EVENT_CAR_VIEW, this.views.car);
				break;

			case API_EXEC_UPDATE_UPLOAD_GZ: // Загрузка файла прошивки
				this.update.upload.set(data);
				this.emit(API_EVENT_UPDATE_UPLOAD_GZ, this.update.upload);
				this.nextUpload().then();
				break;
			case API_EXEC_UPDATE_BEGIN_GZ: // Запуск обновления прошивки
				this.update.begin.set(data);
				this.emit(API_EVENT_UPDATE_BEGIN_GZ, this.update.begin);
				break;

			case API_EXEC_VARIABLE_CONFIG: // Вся конфигурация переменных
				this.configs.variable.set(data);
				this.emitVariableConfigs(this.configs.variable);
				break;

			case API_EXEC_VARIABLE_VIEW: // Все параметры отображения переменных
				this.views.variable.set(data);
				this.emitVariableViews(this.views.variable);
				break;

			case API_EXEC_VARIABLE_VALUE: // Все значения переменных
				this.values.variable.set(data);
				this.emitVariableValues(this.values.variable);
				break;

			case API_EXEC_VARIABLE_BOSE: // Конфигурация Bose
				this.configs.variable.bose.set(data);
				this.emit(API_EVENT_VARIABLE_BOSE, this.configs.variable.bose);
				break;
			case API_EXEC_VARIABLE_BOSE_VIEW: // Параметры отображения Bose
				this.views.variable.bose.set(data);
				this.emit(API_EVENT_VARIABLE_BOSE_VIEW, this.views.variable.bose);
				break;

			case API_EXEC_VARIABLE_CLIMATE: // Значения климата
				this.values.variable.climate.set(data);
				this.emit(API_EVENT_VARIABLE_CLIMATE, this.values.variable.climate);
				break;
			case API_EXEC_VARIABLE_CLIMATE_VIEW: // Параметры отображения климата
				this.views.variable.climate.set(data);
				this.emit(API_EVENT_VARIABLE_CLIMATE_VIEW, this.views.variable.climate);
				break;

			case API_EXEC_VARIABLE_DOORS: // Значения дверей
				this.values.variable.doors.set(data);
				this.emit(API_EVENT_VARIABLE_DOORS, this.values.variable.doors);
				break;
			case API_EXEC_VARIABLE_DOORS_VIEW: // Параметры отображения дверей
				this.views.variable.doors.set(data);
				this.emit(API_EVENT_VARIABLE_DOORS_VIEW, this.views.variable.doors);
				break;

			case API_EXEC_VARIABLE_ENGINE: // Значения ДВС
				this.values.variable.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE, this.values.variable.engine);
				break;
			case API_EXEC_VARIABLE_ENGINE_CONFIG: // Конфигурация ДВС
				this.configs.variable.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, this.configs.variable.engine);
				break;
			case API_EXEC_VARIABLE_ENGINE_VIEW: // Параметры отображения ДВС
				this.views.variable.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE_VIEW, this.views.variable.engine);
				break;

			case API_EXEC_VARIABLE_FUEL: // Значения расхода
				this.values.variable.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL, this.values.variable.fuel);
				break;
			case API_EXEC_VARIABLE_FUEL_CONFIG: // Конфигурация расхода
				this.configs.variable.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, this.configs.variable.fuel);
				break;
			case API_EXEC_VARIABLE_FUEL_VIEW: // Параметры отображения расхода
				this.views.variable.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL_VIEW, this.views.variable.fuel);
				break;

			case API_EXEC_VARIABLE_MOVEMENT: // Значения движения
				this.values.variable.movement.set(data);
				this.emit(API_EVENT_VARIABLE_MOVEMENT, this.values.variable.movement);
				break;
			case API_EXEC_VARIABLE_MOVEMENT_VIEW: // Параметры отображения движения
				this.views.variable.movement.set(data);
				this.emit(API_EVENT_VARIABLE_MOVEMENT_VIEW, this.views.variable.movement);
				break;

			case API_EXEC_VARIABLE_SENSORS: // Значения датчиков
				this.values.variable.sensors.set(data);
				this.emit(API_EVENT_VARIABLE_SENSORS, this.values.variable.sensors);
				break;
			case API_EXEC_VARIABLE_SENSORS_VIEW: // Параметры отображения датчиков
				this.views.variable.movement.set(data);
				this.emit(API_EVENT_VARIABLE_SENSORS_VIEW, this.views.variable.movement);
				break;

			case API_EXEC_VARIABLE_TEMPERATURE: // Значения температуры
				this.values.variable.temperature.set(data);
				this.emit(API_EVENT_VARIABLE_TEMPERATURE, this.values.variable.temperature);
				break;
			case API_EXEC_VARIABLE_TEMPERATURE_VIEW: // Параметры отображения температуры
				this.views.variable.temperature.set(data);
				this.emit(API_EVENT_VARIABLE_TEMPERATURE_VIEW, this.views.variable.temperature);
				break;

			case API_EXEC_VARIABLE_VOLUME: // Значения уровня звука
				this.values.variable.volume.set(data);
				this.emit(API_EVENT_VARIABLE_VOLUME, this.values.variable.volume);
				break;
			case API_EXEC_VARIABLE_VOLUME_CONFIG: // Конфигурация уровня звука
				this.configs.variable.volume.set(data);
				this.emit(API_EVENT_VARIABLE_VOLUME_CONFIG, this.configs.variable.volume);
				break;
			case API_EXEC_VARIABLE_VOLUME_VIEW: // Параметры отображения уровня звука
				this.views.variable.volume.set(data);
				this.emit(API_EVENT_VARIABLE_VOLUME_VIEW, this.views.variable.volume);
				break;
		}
	}

	/** Запустить процесс загрузки прошивки на устройство */
	beginUpload(): void
	{
		getFirmware()
			.then((res: any) =>
			{
				if (res.data.byteLength > 0)
				{
					setTimeout(() =>
					{
						this.update.upload.data = new Uint8Array(res.data);
						this.update.upload.offset = 0;
						this.update.upload.last = true;
						this.nextUpload().then();
					}, 1000);
				}
			})
			.catch(() => this.emit(API_EVENT_UPDATE_ERROR, t("update.notify.errorDownload")));
	}

	/** Пишем данные файла прошивки в устройство PJ CAN */
	async nextUpload()
	{
		if (
			this.bluetooth.connected &&
			this.update.upload.last &&
			this.update.upload.offset < this.update.upload.data.byteLength
		)
		{
			this.queryDisabled = true;
			await this.bluetooth.send(this.update.upload.get());
		}
		else if (!this.update.upload.last)
		{
			this.queryDisabled = false;
		}

		debounce(() => this.emit(API_EVENT_UPDATE_ERROR, t("update.notify.errorUpload")), 5000);
	}

	/** Запустить процесс обновления устройства */
	async beginUpdate()
	{
		if (this.bluetooth.connected)
		{
			await this.bluetooth.send(this.update.begin.get());
		}
		debounce(() => this.emit(API_EVENT_UPDATE_ERROR, t("update.notify.errorWaitUpdate")), 60000);
	}

	/** Лог версии прошивки */
	private logVersion()
	{
		const { major, minor, build, revision } = this.configs.version;
		console.log(t("BLE.server.versionProtocol", { mj: major, mn: minor, bl: build, rv: revision }));
	}

	/** Проверить версию прошивки */
	checkVersion(): Promise<IVersion>
	{
		return new Promise((resolve, reject) =>
		{
			getFirmwareVersion()
				.then((res: any) =>
				{
					// проверяем версию прошивки
					if (res.data?.current?.length === 4)
					{
						const ver = res.data.current;
						const newVersion: IVersion = new Version();
						newVersion.major = ver[0];
						newVersion.minor = ver[1];
						newVersion.build = ver[2];
						newVersion.revision = ver[3];

						if (this.configs.version.compare(newVersion) > 0) resolve(newVersion);
						else reject("Current version");
					}
					else reject("No data");
				})
				.catch((e) => reject(e));
		});
	}
}

const canbus = new Canbus();
export default canbus;
