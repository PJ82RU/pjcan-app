import EventEmitter from "eventemitter3";
import { toast } from "vue3-toastify";
import { t } from "@/lang";
import { getFirmware, getFirmwareVersion } from "@/api/firmware";
import { getSerial } from "@/api/hash";

import { clearDebounce, debounce } from "@/utils/debounce";
import {
	BLUETOOTH_EVENT_CONNECTED,
	BLUETOOTH_EVENT_RECEIVE,
	Bluetooth,
	TConnectedStatus
} from "@/components/bluetooth";
import { IBaseModel } from "@/models/pjcan/base";
import { API_CONFIG_EXEC, API_CONFIGS_EVENT, Configs, IConfigs } from "@/models/pjcan/configs";
import { API_VIEWS_EXEC, API_VIEWS_EVENT, Views, IViews } from "@/models/pjcan/views";
import {
	API_VARIABLE_CONFIGS_EXEC,
	API_VARIABLE_CONFIGS_EVENT,
	IVariableConfigs
} from "@/models/pjcan/variables/configs";
import { API_VARIABLE_VIEWS_EXEC, API_VARIABLE_VIEWS_EVENT, IVariableViews } from "@/models/pjcan/variables/views";
import {
	API_DEVICE_CONFIG_EXEC,
	API_DEVICE_CONFIG_EVENT,
	API_DEVICE_VALUE_EXEC,
	API_DEVICE_EVENT,
	API_INFO_EXEC,
	API_INFO_EVENT,
	DeviceInfo,
	IDeviceInfo
} from "@/models/pjcan/device";
import {
	API_BUTTONS_CONFIG_EXEC,
	API_BUTTONS_CONFIG_EVENT,
	API_BUTTONS_VALUE_EXEC,
	API_BUTTON_EVENT,
	ButtonValue,
	IButtonValue
} from "@/models/pjcan/button";
import {
	API_TEYES_CONFIG_EXEC,
	API_TEYES_CONFIG_EVENT,
	API_TEYES_TEXT_EXEC,
	API_TEYES_TEXT_EVENT,
	API_TEYES_VIEW_EXEC,
	API_TEYES_VIEW_EVENT,
	TeyesText,
	ITeyesText,
	TeyesConfig
} from "@/models/pjcan/teyes";
import { API_LCD_VALUE_EXEC, API_LCD_EVENT } from "@/models/pjcan/lcd";
import { API_CAR_CONFIG_EXEC, API_CAR_CONFIG_EVENT, API_CAR_VIEW_EXEC, API_CAR_VIEW_EVENT } from "@/models/pjcan/car";
import { API_UPDATE_EXEC, API_UPDATE_EVENT, API_UPDATE_EVENT_ERROR, Update } from "@/models/pjcan/update";
import {
	API_VARIABLE_BOSE_EXEC,
	API_VARIABLE_BOSE_EVENT,
	API_VARIABLE_BOSE_VIEW_EXEC,
	API_VARIABLE_BOSE_VIEW_EVENT
} from "@/models/pjcan/variables/bose";
import {
	API_VARIABLE_CLIMATE_EXEC,
	API_VARIABLE_CLIMATE_EVENT,
	API_VARIABLE_CLIMATE_VIEW_EXEC,
	API_VARIABLE_CLIMATE_VIEW_EVENT
} from "@/models/pjcan/variables/climate";
import {
	API_VARIABLE_DOORS_EXEC,
	API_VARIABLE_DOORS_EVENT,
	API_VARIABLE_DOORS_VIEW_EXEC,
	API_VARIABLE_DOORS_VIEW_EVENT
} from "@/models/pjcan/variables/doors";
import {
	API_VARIABLE_ENGINE_CONFIG_EXEC,
	API_VARIABLE_ENGINE_CONFIG_EVENT,
	API_VARIABLE_ENGINE_EXEC,
	API_VARIABLE_ENGINE_EVENT,
	API_VARIABLE_ENGINE_VIEW_EXEC,
	API_VARIABLE_ENGINE_VIEW_EVENT
} from "@/models/pjcan/variables/engine";
import {
	API_VARIABLE_FUEL_CONFIG_EXEC,
	API_VARIABLE_FUEL_CONFIG_EVENT,
	API_VARIABLE_FUEL_EXEC,
	API_VARIABLE_FUEL_EVENT,
	API_VARIABLE_FUEL_VIEW_EXEC,
	API_VARIABLE_FUEL_VIEW_EVENT
} from "@/models/pjcan/variables/fuel";
import {
	API_VARIABLE_MOVEMENT_EXEC,
	API_VARIABLE_MOVEMENT_EVENT,
	API_VARIABLE_MOVEMENT_VIEW_EXEC,
	API_VARIABLE_MOVEMENT_VIEW_EVENT
} from "@/models/pjcan/variables/movement";
import {
	API_VARIABLE_SENSORS_EXEC,
	API_VARIABLE_SENSORS_EVENT,
	API_VARIABLE_SENSORS_VIEW_EXEC,
	API_VARIABLE_SENSORS_VIEW_EVENT
} from "@/models/pjcan/variables/sensors";
import {
	API_VARIABLE_TEMPERATURE_EXEC,
	API_VARIABLE_TEMPERATURE_EVENT,
	API_VARIABLE_TEMPERATURE_VIEW_EXEC,
	API_VARIABLE_TEMPERATURE_VIEW_EVENT
} from "@/models/pjcan/variables/temperature";
import {
	API_VARIABLE_VOLUME_CONFIG_EXEC,
	API_VARIABLE_VOLUME_CONFIG_EVENT,
	API_VARIABLE_VOLUME_VIEW_EXEC,
	API_VARIABLE_VOLUME_VIEW_EVENT
} from "@/models/pjcan/variables/volume";
import { API_VALUES_EXEC, API_VALUES_EVENT, IValues, Values } from "@/models/pjcan/values";
import { API_VARIABLE_VALUES_EXEC, API_VARIABLE_VALUES_EVENT, IVariablesValue } from "@/models/pjcan/variables/values";
import { IUpdate } from "@/models/pjcan/update/IUpdate";
import { API_VERSION_EVENT, API_VERSION_EXEC, IVersion, Version } from "@/models/pjcan/version";
import { API_VARIABLE_TEST_EXEC } from "@/models/pjcan/variables/test";
import {
	API_SCANNER_CONFIG_EVENT,
	API_SCANNER_CONFIG_EXEC,
	API_SCANNER_VALUE_EVENT,
	API_SCANNER_VALUE_EXEC,
	ScannerConfig,
	ScannerValue
} from "@/models/pjcan/scanner";

const dev = process.env.NODE_ENV === "development";

// Заполняем пустые значения структуры по очереди
TeyesConfig.update();
Configs.update();

export class Canbus extends EventEmitter
{
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Версия прошивки PJCAN */
	version: IVersion = new Version();
	/** Конфигурация устройства */
	configs: IConfigs = new Configs();
	/** Конфигурация отображения значений */
	views: IViews = new Views();
	/** Значения */
	values: IValues = new Values();
	/** Статус циклического запроса */

	/** Устройство */
	deviceInfo: IDeviceInfo = new DeviceInfo();
	/** SHA */
	sha: string | undefined;

	/** Обновление прошивки */
	update: IUpdate = new Update();

	/** Значения кнопки */
	buttonValue: IButtonValue = new ButtonValue();
	/** Текст Teyes */
	teyesText: ITeyesText = new TeyesText();
	/** Конфигурация сканера can-шины */
	scanner = new ScannerConfig();

	/** Запрет на отправку данных */
	private queryDisabled: boolean = true;

	/** Последний promise */
	private promises: Promise<void>[] | null = null;
	private queue: Promise<void>[] = [];
	/** Таймер */
	private debounceFetchValue: number | undefined = undefined;

	/** Статус циклического запроса значений */
	get startedFetchValue(): number | undefined
	{
		return this.debounceFetchValue;
	}

	constructor()
	{
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (ev: any) => this.onConnected(ev));
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
		this.addListener(API_VERSION_EVENT, () => this.begin());
	}

	/**
	 * Запрос/отправка данных
	 * @param {IBaseModel} obj Объект данных
	 */
	private query(obj: IBaseModel): boolean
	{
		if (this.bluetooth.connected)
		{
			this.queue.push(this.bluetooth.send(obj.get()));
			if (!this.promises)
			{
				this.promises = this.queue;
				this.queue = [];
				Promise.all(this.promises)
					.catch((err) =>
					{
						if (dev) console.log("Query:", err);
					})
					.finally(() =>
					{
						this.promises = null;
					});
			}
			return true;
		}
		return false;
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
			this.queryConfig(API_VERSION_EXEC);
		}
		else
		{
			this.queryDisabled = true;
		}
	}

	/** Запуск опросов PJCAN */
	begin()
	{
		if (!this.version.is) return;

		this.queryConfig();
		this.queryView();
		this.queryDisabled = false;
		if (this.debounceFetchValue === undefined)
		{
			this.queryValue();
		}
	}

	/**
	 * Отправить/получить конфигурацию
	 * @param {number} type Тип конфигурации
	 */
	queryConfig(type: number = 0): boolean
	{
		switch (type)
		{
			case API_VERSION_EXEC:
				return this.query(this.version);

			case API_VARIABLE_CONFIGS_EXEC:
				return this.query(this.configs.variable);

			case API_BUTTONS_CONFIG_EXEC:
				return !this.queryDisabled && this.query(this.configs.buttons);

			case API_CAR_CONFIG_EXEC:
				return this.query(this.configs.car);

			case API_DEVICE_CONFIG_EXEC:
				return this.query(this.configs.device);

			case API_TEYES_CONFIG_EXEC:
				return this.query(this.configs.teyes);

			case API_VARIABLE_BOSE_EXEC:
				return this.query(this.configs.variable.bose);

			case API_VARIABLE_ENGINE_CONFIG_EXEC:
				return this.query(this.configs.variable.engine);

			case API_VARIABLE_FUEL_CONFIG_EXEC:
				return this.query(this.configs.variable.fuel);

			case API_VARIABLE_VOLUME_CONFIG_EXEC:
				return this.query(this.configs.variable.volume);

			case API_SCANNER_CONFIG_EXEC:
				return this.query(this.scanner);

			default:
				return this.query(this.configs);
		}
	}

	/**
	 * Отправить/получить конфигурацию отображения значений
	 * @param {number} type Тип конфигурации отображения значений
	 */
	queryView(type: number = 0): boolean
	{
		switch (type)
		{
			case API_VARIABLE_VIEWS_EXEC:
				return this.query(this.views.variable);

			case API_CAR_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.car);

			case API_TEYES_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.teyes);

			case API_VARIABLE_BOSE_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.bose);

			case API_VARIABLE_CLIMATE_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.climate);

			case API_VARIABLE_DOORS_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.doors);

			case API_VARIABLE_ENGINE_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.engine);

			case API_VARIABLE_FUEL_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.fuel);

			case API_VARIABLE_MOVEMENT_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.movement);

			case API_VARIABLE_SENSORS_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.sensors);

			case API_VARIABLE_TEMPERATURE_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.temperature);

			case API_VARIABLE_VOLUME_VIEW_EXEC:
				return !this.queryDisabled && this.query(this.views.variable.volume);

			default:
				return this.query(this.views);
		}
	}

	/** Отправить/получить значения
	 * @param {number} type Тип значения
	 * @param {IBaseModel|undefined} value Передаваемые значения
	 */
	queryValue(type: number = 0, value: IBaseModel | undefined = undefined): boolean
	{
		if (this.queryDisabled) return false;

		switch (type)
		{
			case API_VARIABLE_VALUES_EXEC:
				return this.query(this.values.variable);

			case API_DEVICE_VALUE_EXEC:
				return this.query(this.values.device);

			case API_INFO_EXEC:
				return this.query(this.deviceInfo);

			case API_LCD_VALUE_EXEC:
				return this.query(this.values.lcd);

			case API_VARIABLE_CLIMATE_EXEC:
				return this.query(this.values.variable.climate);

			case API_VARIABLE_DOORS_EXEC:
				return this.query(this.values.variable.doors);

			case API_VARIABLE_ENGINE_EXEC:
				return this.query(this.values.variable.engine);

			case API_VARIABLE_FUEL_EXEC:
				return this.query(this.values.variable.fuel);

			case API_VARIABLE_MOVEMENT_EXEC:
				return this.query(this.values.variable.movement);

			case API_VARIABLE_SENSORS_EXEC:
				return this.query(this.values.variable.sensors);

			case API_VARIABLE_TEMPERATURE_EXEC:
				return this.query(this.values.variable.temperature);

			case API_VARIABLE_TEST_EXEC:
				return !!value && this.query(value);

			case API_SCANNER_VALUE_EXEC:
				return this.query(value ?? new ScannerValue());

			default:
				return this.query(this.values);
		}
	}

	/**
	 * Запустить циклический запрос значений
	 * @param {number} type Тип значения
	 * @param {IBaseModel|undefined} value Передаваемые значения
	 * @param {number} timeout Пауза между ответом и запросом
	 */
	startFetchValue(type: number = 0, value: IBaseModel | undefined = undefined, timeout: number = 500)
	{
		this.debounceFetchValue = type;
		debounce(async () =>
		{
			this.queryValue(type, value);
			if (this.debounceFetchValue !== undefined)
			{
				this.startFetchValue(type, value, timeout);
			}
		}, timeout);
	}

	/** Остановить циклический запрос значений */
	stopFetchValue()
	{
		this.debounceFetchValue = undefined;
		clearDebounce();
	}

	/**
	 * Событие входящих значений конфигурации
	 * @param {IVariableConfigs} config Конфигурация
	 */
	private emitVariableConfigs(config: IVariableConfigs): void
	{
		this.emit(API_VARIABLE_CONFIGS_EVENT, config);
		this.emit(API_VARIABLE_BOSE_EVENT, config.bose);
		this.emit(API_VARIABLE_ENGINE_CONFIG_EVENT, config.engine);
		this.emit(API_VARIABLE_FUEL_CONFIG_EVENT, config.fuel);
		this.emit(API_VARIABLE_VOLUME_CONFIG_EVENT, config.volume);
	}

	/**
	 * Событие входящих значений отображения
	 * @param {IVariableViews} view Параметры отображения
	 */
	private emitVariableViews(view: IVariableViews): void
	{
		this.emit(API_VARIABLE_VIEWS_EVENT, view);
		this.emit(API_VARIABLE_BOSE_VIEW_EVENT, view.bose);
		this.emit(API_VARIABLE_CLIMATE_VIEW_EVENT, view.climate);
		this.emit(API_VARIABLE_DOORS_VIEW_EVENT, view.doors);
		this.emit(API_VARIABLE_ENGINE_VIEW_EVENT, view.engine);
		this.emit(API_VARIABLE_FUEL_VIEW_EVENT, view.fuel);
		this.emit(API_VARIABLE_MOVEMENT_VIEW_EVENT, view.movement);
		this.emit(API_VARIABLE_SENSORS_VIEW_EVENT, view.sensors);
		this.emit(API_VARIABLE_TEMPERATURE_VIEW_EVENT, view.temperature);
		this.emit(API_VARIABLE_VOLUME_VIEW_EVENT, view.volume);
	}

	/**
	 * Событие входящих значений
	 * @param {IVariablesValue} value Значения
	 */
	private emitVariableValues(value: IVariablesValue): void
	{
		this.emit(API_VARIABLE_VALUES_EVENT, value);
		this.emit(API_VARIABLE_CLIMATE_EVENT, value.climate);
		this.emit(API_VARIABLE_DOORS_EVENT, value.doors);
		this.emit(API_VARIABLE_ENGINE_EVENT, value.engine);
		this.emit(API_VARIABLE_FUEL_EVENT, value.fuel);
		this.emit(API_VARIABLE_MOVEMENT_EVENT, value.movement);
		this.emit(API_VARIABLE_SENSORS_EVENT, value.sensors);
		this.emit(API_VARIABLE_TEMPERATURE_EVENT, value.temperature);
	}

	/**
	 * Входящие данные
	 * @param data Данные
	 */
	onReceive(data: DataView): void
	{
		switch (data.getUint8(0))
		{
			case API_VERSION_EXEC: // Версия прошивки
				this.version.set(data);
				this.updateStructVersion();
				this.emit(API_VERSION_EVENT, this.version);
				break;

			case API_CONFIG_EXEC: // Вся конфигурация
				this.configs.set(data);
				// для совместимости
				if (this.version.setVersion(this.configs.version))
				{
					this.updateStructVersion();
					this.emit(API_VERSION_EVENT, this.version);
				}

				this.emit(API_CONFIGS_EVENT, this.configs);
				this.emit(API_DEVICE_CONFIG_EVENT, this.configs.device);
				this.emit(API_BUTTONS_CONFIG_EVENT, this.configs.buttons);
				this.emit(API_CAR_CONFIG_EVENT, this.configs.car);
				this.emit(API_TEYES_CONFIG_EVENT, this.configs.teyes);
				this.emitVariableConfigs(this.configs.variable);
				break;

			case API_VIEWS_EXEC: // Все параметры отображения
				this.views.set(data);

				this.emit(API_VIEWS_EVENT, this.views);
				this.emit(API_CAR_VIEW_EVENT, this.views.car);
				this.emit(API_TEYES_VIEW_EVENT, this.views.teyes);
				this.emitVariableViews(this.views.variable);
				break;

			case API_VALUES_EXEC: // Все значения
				this.values.set(data);
				if (!this.values.device.activation && !this.sha)
				{
					this.queryValue(API_INFO_EXEC);
				}

				this.emit(API_VALUES_EVENT, this.values);
				this.emit(API_DEVICE_EVENT, this.values.device);
				this.emit(API_LCD_EVENT, this.values.lcd);
				this.emitVariableValues(this.values.variable);
				break;

			case API_INFO_EXEC: // Информация об устройстве
				this.deviceInfo.set(data);
				if (this.values.device.isData && !this.sha) this.getSHA();
				this.emit(API_INFO_EVENT, this.deviceInfo);
				break;
			case API_DEVICE_CONFIG_EXEC: // Конфигурация устройства
				this.configs.device.set(data);
				this.emit(API_DEVICE_CONFIG_EVENT, this.configs.device);
				break;
			case API_DEVICE_VALUE_EXEC: // Значения устройства
				this.values.device.set(data);
				this.emit(API_DEVICE_EVENT, this.values.device);
				break;

			case API_BUTTONS_CONFIG_EXEC: // Конфигурация кнопок
				this.configs.buttons.set(data);
				this.emit(API_BUTTONS_CONFIG_EVENT, this.configs.buttons);
				break;
			case API_BUTTONS_VALUE_EXEC: // Значения кнопки
				this.buttonValue.set(data);
				this.emit(API_BUTTON_EVENT, this.buttonValue);
				break;

			case API_TEYES_CONFIG_EXEC: // Конфигурация Teyes
				this.configs.teyes.set(data);
				this.emit(API_TEYES_CONFIG_EVENT, this.configs.teyes);
				break;
			case API_TEYES_VIEW_EXEC: // Параметры отображения Teyes
				this.views.teyes.set(data);
				this.emit(API_TEYES_VIEW_EVENT, this.views.teyes);
				break;
			case API_TEYES_TEXT_EXEC: // Текст Teyes
				this.teyesText.set(data);
				this.emit(API_TEYES_TEXT_EVENT, this.teyesText);
				break;

			case API_LCD_VALUE_EXEC: // Значения LCD
				this.values.lcd.set(data);
				this.emit(API_LCD_EVENT, this.values.lcd);
				break;

			case API_CAR_CONFIG_EXEC: // Конфигурация машины
				this.configs.car.set(data);
				this.emit(API_CAR_CONFIG_EVENT, this.configs.car);
				break;
			case API_CAR_VIEW_EXEC: // Параметры отображения машины
				this.views.car.set(data);
				this.emit(API_CAR_VIEW_EVENT, this.views.car);
				break;

			case API_UPDATE_EXEC: // Обновление прошивки
				this.update.set(data);
				this.emit(API_UPDATE_EVENT, this.update);
				break;

			case API_VARIABLE_CONFIGS_EXEC: // Вся конфигурация переменных
				this.configs.variable.set(data);
				this.emitVariableConfigs(this.configs.variable);
				break;

			case API_VARIABLE_VIEWS_EXEC: // Все параметры отображения переменных
				this.views.variable.set(data);
				this.emitVariableViews(this.views.variable);
				break;

			case API_VARIABLE_VALUES_EXEC: // Все значения переменных
				this.values.variable.set(data);
				this.emitVariableValues(this.values.variable);
				break;

			case API_VARIABLE_BOSE_EXEC: // Конфигурация Bose
				this.configs.variable.bose.set(data);
				this.emit(API_VARIABLE_BOSE_EVENT, this.configs.variable.bose);
				break;
			case API_VARIABLE_BOSE_VIEW_EXEC: // Параметры отображения Bose
				this.views.variable.bose.set(data);
				this.emit(API_VARIABLE_BOSE_VIEW_EVENT, this.views.variable.bose);
				break;

			case API_VARIABLE_CLIMATE_EXEC: // Значения климата
				this.values.variable.climate.set(data);
				this.emit(API_VARIABLE_CLIMATE_EVENT, this.values.variable.climate);
				break;
			case API_VARIABLE_CLIMATE_VIEW_EXEC: // Параметры отображения климата
				this.views.variable.climate.set(data);
				this.emit(API_VARIABLE_CLIMATE_VIEW_EVENT, this.views.variable.climate);
				break;

			case API_VARIABLE_DOORS_EXEC: // Значения дверей
				this.values.variable.doors.set(data);
				this.emit(API_VARIABLE_DOORS_EVENT, this.values.variable.doors);
				break;
			case API_VARIABLE_DOORS_VIEW_EXEC: // Параметры отображения дверей
				this.views.variable.doors.set(data);
				this.emit(API_VARIABLE_DOORS_VIEW_EVENT, this.views.variable.doors);
				break;

			case API_VARIABLE_ENGINE_EXEC: // Значения ДВС
				this.values.variable.engine.set(data);
				this.emit(API_VARIABLE_ENGINE_EVENT, this.values.variable.engine);
				break;
			case API_VARIABLE_ENGINE_CONFIG_EXEC: // Конфигурация ДВС
				this.configs.variable.engine.set(data);
				this.emit(API_VARIABLE_ENGINE_CONFIG_EVENT, this.configs.variable.engine);
				break;
			case API_VARIABLE_ENGINE_VIEW_EXEC: // Параметры отображения ДВС
				this.views.variable.engine.set(data);
				this.emit(API_VARIABLE_ENGINE_VIEW_EVENT, this.views.variable.engine);
				break;

			case API_VARIABLE_FUEL_EXEC: // Значения расхода
				this.values.variable.fuel.set(data);
				this.emit(API_VARIABLE_FUEL_EVENT, this.values.variable.fuel);
				break;
			case API_VARIABLE_FUEL_CONFIG_EXEC: // Конфигурация расхода
				this.configs.variable.fuel.set(data);
				this.emit(API_VARIABLE_FUEL_CONFIG_EVENT, this.configs.variable.fuel);
				break;
			case API_VARIABLE_FUEL_VIEW_EXEC: // Параметры отображения расхода
				this.views.variable.fuel.set(data);
				this.emit(API_VARIABLE_FUEL_VIEW_EVENT, this.views.variable.fuel);
				break;

			case API_VARIABLE_MOVEMENT_EXEC: // Значения движения
				this.values.variable.movement.set(data);
				this.emit(API_VARIABLE_MOVEMENT_EVENT, this.values.variable.movement);
				break;
			case API_VARIABLE_MOVEMENT_VIEW_EXEC: // Параметры отображения движения
				this.views.variable.movement.set(data);
				this.emit(API_VARIABLE_MOVEMENT_VIEW_EVENT, this.views.variable.movement);
				break;

			case API_VARIABLE_SENSORS_EXEC: // Значения датчиков
				this.values.variable.sensors.set(data);
				this.emit(API_VARIABLE_SENSORS_EVENT, this.values.variable.sensors);
				break;
			case API_VARIABLE_SENSORS_VIEW_EXEC: // Параметры отображения датчиков
				this.views.variable.movement.set(data);
				this.emit(API_VARIABLE_SENSORS_VIEW_EVENT, this.views.variable.movement);
				break;

			case API_VARIABLE_TEMPERATURE_EXEC: // Значения температуры
				this.values.variable.temperature.set(data);
				this.emit(API_VARIABLE_TEMPERATURE_EVENT, this.values.variable.temperature);
				break;
			case API_VARIABLE_TEMPERATURE_VIEW_EXEC: // Параметры отображения температуры
				this.views.variable.temperature.set(data);
				this.emit(API_VARIABLE_TEMPERATURE_VIEW_EVENT, this.views.variable.temperature);
				break;

			case API_VARIABLE_VOLUME_CONFIG_EXEC: // Конфигурация уровня звука
				this.configs.variable.volume.set(data);
				this.emit(API_VARIABLE_VOLUME_CONFIG_EVENT, this.configs.variable.volume);
				break;
			case API_VARIABLE_VOLUME_VIEW_EXEC: // Параметры отображения уровня звука
				this.views.variable.volume.set(data);
				this.emit(API_VARIABLE_VOLUME_VIEW_EVENT, this.views.variable.volume);
				break;

			case API_SCANNER_CONFIG_EXEC: // Конфигурация сканирования
				this.scanner.set(data);
				this.emit(API_SCANNER_CONFIG_EVENT, this.scanner);
				break;
			case API_SCANNER_VALUE_EXEC: // Значения сканирования
				this.emit(API_SCANNER_VALUE_EVENT, new ScannerValue(data));
				break;
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
			.catch(() => this.emit(API_UPDATE_EVENT_ERROR, t("update.notify.errorDownload")));
	}

	/** Пишем данные файла прошивки в устройство PJCAN */
	async updateUpload()
	{
		if (this.bluetooth.connected && this.update.error === 0 && this.update.offset <= this.update.total)
		{
			this.queryDisabled = true;
			await this.bluetooth.send(this.update.get());
		}
		else if (this.update.error !== 0)
		{
			this.queryDisabled = false;
		}

		if (this.update.end)
		{
			debounce(() => this.emit(API_UPDATE_EVENT_ERROR, t("update.notify.errorWaitUpdate")), 60000);
		}
		else
		{
			debounce(() => this.emit(API_UPDATE_EVENT_ERROR, t("update.notify.errorUpload")), 5000);
		}
	}

	/** Обновление структур */
	private updateStructVersion()
	{
		const { major, minor, build, revision } = this.version;
		console.log(t("BLE.server.versionProtocol", { mj: major, mn: minor, bl: build, rv: revision }));

		Configs.update(this.version);
		Values.update(this.version);
		Views.update(this.version);
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
	 */
	rebootDevice(save: boolean = false)
	{
		this.values.device.reboot = true;
		this.values.device.save = save;
		this.queryValue(API_DEVICE_VALUE_EXEC);
	}

	/**
	 * Сбросить настройки устройства
	 * @param {boolean} resetConfig Удалить конфигурацию
	 * @param {boolean} resetView Удалить параметры отображения
	 */
	resetDevice(resetConfig: boolean = true, resetView: boolean = true)
	{
		this.values.device.resetConfig = resetConfig;
		this.values.device.resetView = resetView;
		this.sha = undefined;
		this.rebootDevice();
	}

	private getSHA(): void
	{
		this.sha = "";
		this.deviceInfo.sha.forEach((x) =>
		{
			const hex = x.toString(16);
			this.sha += (hex.length === 1 ? "0" : "") + hex;
		});

		if (!this.values.device.activation)
		{
			getSerial(this.sha)
				.then(async (res: any) =>
				{
					this.configs.device.serial = res?.sha ?? "";
					await this.queryConfig(API_DEVICE_CONFIG_EXEC);
					this.rebootDevice(true);
					toast.success(t("activation.success"));
				})
				.catch(() =>
				{
					toast.error(t("activation.error"));
				});
		}
	}
}

const canbus = new Canbus();
export default canbus;
