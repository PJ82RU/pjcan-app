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
	IDevice,
	DeviceInfo,
	DeviceAction,
	DeviceConfig,
	DeviceValue,
	DeviceUpdate,
	DeviceScannerValue
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
	IButtons,
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
	TeyesConfig,
	ITeyes
} from "@/models/pjcan/teyes";
import {
	API_MAZDA_CONFIG_EXEC,
	API_MAZDA_CONFIG_EVENT,
	API_MAZDA_VIEW_EXEC,
	API_MAZDA_VIEW_EVENT,
	IMazda,
	MazdaConfig
} from "@/models/pjcan/mazda";
import {
	API_DATETIME_CONFIG_EVENT,
	API_DATETIME_CONFIG_EXEC,
	API_DATETIME_VIEW_EVENT,
	API_DATETIME_VIEW_EXEC,
	DatetimeConfig,
	IDatetime
} from "@/models/pjcan/datetime";
import {
	API_BOSE_CONFIG_EXEC,
	API_BOSE_CONFIG_EVENT,
	API_BOSE_VIEW_EXEC,
	API_BOSE_VIEW_EVENT,
	IBose,
	BoseConfig
} from "src/models/pjcan/bose";
import {
	API_CLIMATE_VALUE_EXEC,
	API_CLIMATE_VALUE_EVENT,
	API_CLIMATE_VIEW_EXEC,
	API_CLIMATE_VIEW_EVENT,
	IClimate,
	ClimateValue
} from "src/models/pjcan/climate";
import {
	API_DOORS_VALUE_EXEC,
	API_DOORS_VALUE_EVENT,
	API_DOORS_VIEW_EXEC,
	API_DOORS_VIEW_EVENT,
	IDoors,
	DoorsValue
} from "src/models/pjcan/doors";
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
	IEngine,
	EngineConfig,
	EngineValue,
	EngineView
} from "src/models/pjcan/engine";
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
	IFuel,
	FuelConfig,
	FuelValue,
	FuelView
} from "src/models/pjcan/fuel";
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
	IMovement,
	MovementValue,
	MovementView
} from "src/models/pjcan/movement";
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
	ISensors,
	SensorsValue,
	SensorsView
} from "src/models/pjcan/sensors";
import {
	API_TEMPERATURE_VALUE_EXEC,
	API_TEMPERATURE_VALUE_EVENT,
	API_TEMPERATURE_VIEW_EXEC,
	API_TEMPERATURE_VIEW_EVENT,
	ITemperature,
	TemperatureValue
} from "src/models/pjcan/temperature";
import {
	API_VOLUME_CONFIG_EXEC,
	API_VOLUME_CONFIG_EVENT,
	API_VOLUME_VIEW_EXEC,
	API_VOLUME_VIEW_EVENT,
	IVolume,
	VolumeConfig
} from "src/models/pjcan/volume";
import { API_VERSION_EVENT, IVersion, Version } from "@/models/pjcan/version";

import { IQuery } from "@/models/interfaces/IQuery";
import { ViewConfig } from "@/models/pjcan/view";

const dev = process.env.NODE_ENV === "development";

export class Canbus extends EventEmitter
{
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Версия прошивки PJCAN */
	version: IVersion = new Version();
	/** Устройство */
	device: IDevice = {
		info: new DeviceInfo(),
		config: new DeviceConfig(),
		value: new DeviceValue(),
		update: new DeviceUpdate()
	};
	/** SHA */
	sha: string | undefined;
	/** Кнопки SW1 */
	sw1: IButtons = {
		config: new ButtonsConfig(API_BUTTONS_SW1_CONFIG_EXEC),
		value: new ButtonValue(API_BUTTON_SW1_VALUE_EXEC)
	};
	/** Кнопки SW3 */
	sw3: IButtons = {
		config: new ButtonsConfig(API_BUTTONS_SW3_CONFIG_EXEC),
		value: new ButtonValue(API_BUTTON_SW3_VALUE_EXEC)
	};
	/** Автомобиль */
	mazda: IMazda = {
		config: new MazdaConfig(),
		viewHello: new ViewConfig(API_MAZDA_VIEW_EXEC)
	};
	/** Дата и время */
	datetime: IDatetime = {
		config: new DatetimeConfig(),
		view: new ViewConfig(API_DATETIME_VIEW_EXEC)
	};
	/** Teyes */
	teyes: ITeyes = {
		config: new TeyesConfig(),
		text: new TeyesText(),
		textView: new ViewConfig(API_TEYES_TEXT_VIEW_EXEC)
	};
	/** Bose */
	bose: IBose = {
		config: new BoseConfig(),
		view: new ViewConfig(API_BOSE_VIEW_EXEC)
	};
	/** Климат-контроль */
	climate: IClimate = {
		value: new ClimateValue(),
		view: new ViewConfig(API_CLIMATE_VIEW_EXEC)
	};
	/** Двери */
	doors: IDoors = {
		value: new DoorsValue(),
		view: new ViewConfig(API_DOORS_VIEW_EXEC)
	};
	/** ДВС */
	engine: IEngine = {
		config: new EngineConfig(),
		value: new EngineValue(),
		view: new EngineView()
	};
	/** Расход топлива */
	fuel: IFuel = {
		config: new FuelConfig(),
		value: new FuelValue(),
		view: new FuelView()
	};
	/** Движение автомобиля */
	movement: IMovement = {
		value: new MovementValue(),
		view: new MovementView()
	};
	/** Датчики */
	sensors: ISensors = {
		value: new SensorsValue(),
		view: new SensorsView()
	};
	/** Температура */
	temperature: ITemperature = {
		value: new TemperatureValue(),
		view: new ViewConfig(API_TEMPERATURE_VIEW_EXEC)
	};
	/** Уровень звука */
	volume: IVolume = {
		config: new VolumeConfig(),
		view: new ViewConfig(API_VOLUME_VIEW_EXEC)
	};

	/** Очередь */
	private queue: IQuery[] = [];
	/** Ожидание следующей очереди */
	private queueWait: boolean = false;
	/** Запрет на отправку данных */
	queueDisabled: boolean = false;
	/** Таймер */
	private debounce = createDebounce();

	constructor()
	{
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (ev: any) => this.onConnected(ev));
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
		this.addListener(API_VERSION_EVENT, () => this.begin());
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
		}
	}

	/** Запуск опросов PJCAN */
	begin()
	{
		if (!this.version.is) return;
		this.removeListener(API_VERSION_EVENT, () => this.begin());

		this.queueDisabled = false;

		// получаем всю конфигурацию устройства
		this.query(this.sw1.config, true);
		this.query(this.sw3.config, true);
		this.query(this.mazda.config, true);
		this.query(this.mazda.viewHello, true);
		this.query(this.datetime.config, true);
		this.query(this.datetime.view, true);
		this.query(this.teyes.config, true);
		this.query(this.teyes.textView, true);
		this.query(this.bose.config, true);
		this.query(this.bose.view, true);
		this.query(this.climate.view, true);
		this.query(this.doors.view, true);
		this.query(this.engine.config, true);
		this.query(this.engine.view, true);
		this.query(this.fuel.config, true);
		this.query(this.fuel.view, true);
		this.query(this.movement.view, true);
		this.query(this.sensors.view, true);
		this.query(this.temperature.view, true);
		this.query(this.volume.config, true);
		this.query(this.volume.view, true);
	}

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
				case API_DEVICE_INFO_EXEC: // Информация об устройстве
					this.device.info.set(data);
					if (this.device.value.isData && !this.sha) this.getSHA();
					this.emit(API_DEVICE_INFO_EVENT, this.device.info);
					break;
				case API_DEVICE_CONFIG_EXEC: // Конфигурация устройства
					this.device.config.set(data);
					this.emit(API_DEVICE_CONFIG_EVENT, this.device.config);
					break;
				case API_DEVICE_VALUE_EXEC: // Значения устройства
					this.device.value.set(data);
					this.emit(API_DEVICE_VALUE_EVENT, this.device.value);
					break;
				case API_DEVICE_UPDATE_EXEC: // Обновление прошивки
					this.device.update.set(data);
					this.emit(API_DEVICE_UPDATE_EVENT, this.device.update);
					break;
				case API_DEVICE_SCANNER_VALUE_EXEC: // Значения сканирования
					this.emit(API_DEVICE_SCANNER_VALUE_EVENT, new DeviceScannerValue(data));
					break;

				case API_BUTTONS_SW1_CONFIG_EXEC: // Конфигурация кнопок SW1
					this.sw1.config.set(data);
					this.emit(API_BUTTONS_SW1_CONFIG_EVENT, this.sw1.config);
					break;
				case API_BUTTON_SW1_VALUE_EXEC: // Значения кнопки SW1
					this.sw1.value.set(data);
					this.emit(API_BUTTON_SW1_VALUE_EVENT, this.sw1.value);
					break;
				case API_BUTTONS_SW3_CONFIG_EXEC: // Конфигурация кнопок SW3
					this.sw3.config.set(data);
					this.emit(API_BUTTONS_SW3_CONFIG_EVENT, this.sw3.config);
					break;
				case API_BUTTON_SW3_VALUE_EXEC: // Значения кнопки SW3
					this.sw3.value.set(data);
					this.emit(API_BUTTON_SW3_VALUE_EVENT, this.sw3.value);
					break;

				case API_MAZDA_CONFIG_EXEC: // Конфигурация автомобиля
					this.mazda.config.set(data);
					this.emit(API_MAZDA_CONFIG_EVENT, this.mazda.config);
					break;
				case API_MAZDA_VIEW_EXEC: // Конфигурация отображения текста приветствия
					this.mazda.viewHello.set(data);
					this.emit(API_MAZDA_VIEW_EVENT, this.mazda.viewHello);
					break;

				case API_DATETIME_CONFIG_EXEC: // Конфигурация времени
					this.datetime.config.set(data);
					this.emit(API_DATETIME_CONFIG_EVENT, this.datetime.config);
					break;
				case API_DATETIME_VIEW_EXEC: // Конфигурация отображения времени
					this.datetime.view.set(data);
					this.emit(API_DATETIME_VIEW_EVENT, this.datetime.view);
					break;

				case API_TEYES_CONFIG_EXEC: // Конфигурация Teyes
					this.teyes.config.set(data);
					this.emit(API_TEYES_CONFIG_EVENT, this.teyes.config);
					break;
				case API_TEYES_TEXT_EXEC: // Текст Teyes
					this.teyes.text.set(data);
					this.emit(API_TEYES_TEXT_EVENT, this.teyes.text);
					break;
				case API_TEYES_TEXT_VIEW_EXEC: // Параметры отображения Teyes
					this.teyes.textView.set(data);
					this.emit(API_TEYES_TEXT_VIEW_EVENT, this.teyes.textView);
					break;

				case API_BOSE_CONFIG_EXEC: // Конфигурация Bose
					this.bose.config.set(data);
					this.emit(API_BOSE_CONFIG_EVENT, this.bose.config);
					break;
				case API_BOSE_VIEW_EXEC: // Параметры отображения Bose
					this.bose.view.set(data);
					this.emit(API_BOSE_VIEW_EVENT, this.bose.view);
					break;

				case API_CLIMATE_VALUE_EXEC: // Значения климат-контроля
					this.climate.value.set(data);
					this.emit(API_CLIMATE_VALUE_EVENT, this.climate.value);
					break;
				case API_CLIMATE_VIEW_EXEC: // Параметры отображения климат-контроля
					this.climate.view.set(data);
					this.emit(API_CLIMATE_VIEW_EVENT, this.climate.view);
					break;

				case API_DOORS_VALUE_EXEC: // Значения дверей
					this.doors.value.set(data);
					this.emit(API_DOORS_VALUE_EVENT, this.doors.value);
					break;
				case API_DOORS_VIEW_EXEC: // Параметры отображения дверей
					this.doors.view.set(data);
					this.emit(API_DOORS_VIEW_EVENT, this.doors.view);
					break;

				case API_ENGINE_CONFIG_EXEC: // Конфигурация ДВС
					this.engine.config.set(data);
					this.emit(API_ENGINE_CONFIG_EVENT, this.engine.config);
					break;
				case API_ENGINE_VALUE_EXEC: // Значения ДВС
					this.engine.value.set(data);
					this.emit(API_ENGINE_VALUE_EVENT, this.engine.value);
					break;
				case API_ENGINE_VIEW_EXEC: // Параметры отображения ДВС
					this.engine.view.set(data);
					this.emit(API_ENGINE_VIEW_EVENT, this.engine.view);
					break;
				case API_ENGINE_VIEW_ENABLED_EXEC:
					this.engine.view.enabled.set(data);
					this.emit(API_ENGINE_VIEW_ENABLED_EVENT, this.engine.view.enabled);
					break;
				case API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC:
					this.engine.view.totalWorktime.set(data);
					this.emit(API_ENGINE_VIEW_TOTAL_WORKTIME_EVENT, this.engine.view.totalWorktime);
					break;
				case API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC:
					this.engine.view.totalCountRPM.set(data);
					this.emit(API_ENGINE_VIEW_TOTAL_COUNT_RPM_EVENT, this.engine.view.totalCountRPM);
					break;
				case API_ENGINE_VIEW_COOLANT_EXEC:
					this.engine.view.coolant.set(data);
					this.emit(API_ENGINE_VIEW_COOLANT_EVENT, this.engine.view.coolant);
					break;
				case API_ENGINE_VIEW_RPM_EXEC:
					this.engine.view.rpm.set(data);
					this.emit(API_ENGINE_VIEW_RPM_EVENT, this.engine.view.rpm);
					break;
				case API_ENGINE_VIEW_LOAD_EXEC:
					this.engine.view.load.set(data);
					this.emit(API_ENGINE_VIEW_LOAD_EVENT, this.engine.view.load);
					break;
				case API_ENGINE_VIEW_THROTTLE_EXEC:
					this.engine.view.throttle.set(data);
					this.emit(API_ENGINE_VIEW_THROTTLE_EVENT, this.engine.view.throttle);
					break;

				case API_FUEL_CONFIG_EXEC: // Конфигурация расхода
					this.fuel.config.set(data);
					this.emit(API_FUEL_CONFIG_EVENT, this.fuel.config);
					break;
				case API_FUEL_VALUE_EXEC: // Значения расхода
					this.fuel.value.set(data);
					this.emit(API_FUEL_VALUE_EVENT, this.fuel.value);
					break;
				case API_FUEL_VIEW_EXEC: // Параметры отображения расхода
					this.fuel.view.set(data);
					this.emit(API_FUEL_VIEW_EVENT, this.fuel.view);
					break;
				case API_FUEL_VIEW_CURRENT_EXEC:
					this.fuel.view.current.set(data);
					this.emit(API_FUEL_VIEW_CURRENT_EVENT, this.fuel.view.current);
					break;
				case API_FUEL_VIEW_AVG_EXEC:
					this.fuel.view.avg.set(data);
					this.emit(API_FUEL_VIEW_AVG_EVENT, this.fuel.view.avg);
					break;

				case API_MOVEMENT_VALUE_EXEC: // Значения движения
					this.movement.value.set(data);
					this.emit(API_MOVEMENT_VALUE_EVENT, this.movement.value);
					break;
				case API_MOVEMENT_VIEW_EXEC: // Параметры отображения движения
					this.movement.view.set(data);
					this.emit(API_MOVEMENT_VIEW_EVENT, this.movement.view);
					break;
				case API_MOVEMENT_VIEW_SPEED_EXEC:
					this.movement.view.speed.set(data);
					this.emit(API_MOVEMENT_VIEW_SPEED_EVENT, this.movement.view.speed);
					break;
				case API_MOVEMENT_VIEW_SPEED_AVG_EXEC:
					this.movement.view.speedAVG.set(data);
					this.emit(API_MOVEMENT_VIEW_SPEED_AVG_EVENT, this.movement.view.speedAVG);
					break;
				case API_MOVEMENT_VIEW_REST_WAY_EXEC:
					this.movement.view.restWay.set(data);
					this.emit(API_MOVEMENT_VIEW_REST_WAY_EVENT, this.movement.view.restWay);
					break;

				case API_SENSORS_VALUE_EXEC: // Значения датчиков
					this.sensors.value.set(data);
					this.emit(API_SENSORS_VALUE_EVENT, this.sensors.value);
					break;
				case API_SENSORS_VIEW_EXEC: // Параметры отображения датчиков
					this.sensors.view.set(data);
					this.emit(API_SENSORS_VIEW_EVENT, this.sensors.view);
					break;
				case API_SENSORS_VIEW_HANDBRAKE_EXEC:
					this.sensors.view.handbrake.set(data);
					this.emit(API_SENSORS_VIEW_HANDBRAKE_EVENT, this.sensors.view.handbrake);
					break;
				case API_SENSORS_VIEW_REVERSE_EXEC:
					this.sensors.view.reverse.set(data);
					this.emit(API_SENSORS_VIEW_REVERSE_EVENT, this.sensors.view.reverse);
					break;
				case API_SENSORS_VIEW_SEATBELT_EXEC:
					this.sensors.view.seatbelt.set(data);
					this.emit(API_SENSORS_VIEW_SEATBELT_EVENT, this.sensors.view.seatbelt);
					break;
				case API_SENSORS_VIEW_TURN_SIGNAL_EXEC:
					this.sensors.view.turnSignal.set(data);
					this.emit(API_SENSORS_VIEW_TURN_SIGNAL_EVENT, this.sensors.view.turnSignal);
					break;

				case API_TEMPERATURE_VALUE_EXEC: // Значения температуры
					this.temperature.value.set(data);
					this.emit(API_TEMPERATURE_VALUE_EVENT, this.temperature.value);
					break;
				case API_TEMPERATURE_VIEW_EXEC: // Параметры отображения температуры
					this.temperature.view.set(data);
					this.emit(API_TEMPERATURE_VIEW_EVENT, this.temperature.view);
					break;

				case API_VOLUME_CONFIG_EXEC: // Конфигурация уровня звука
					this.volume.config.set(data);
					this.emit(API_VOLUME_CONFIG_EVENT, this.volume.config);
					break;
				case API_VOLUME_VIEW_EXEC: // Параметры отображения уровня звука
					this.volume.view.set(data);
					this.emit(API_VOLUME_VIEW_EVENT, this.volume.view);
					break;
			}
		}
	}

	/** Запустить процесс загрузки прошивки на устройство */
	updateStart(): void
	{
		getFirmware(this.device.update.firmwareUrl)
			.then((res: any) =>
			{
				if (res?.byteLength > 0)
				{
					this.device.update.firmwareData = new Uint8Array(res);
					this.device.update.total = res.byteLength;
					this.device.update.offset = 0;
					this.device.update.error = 0;
					this.device.update.encrypt = this.device.update.iv;
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
			this.device.update.error === 0 &&
			this.device.update.offset <= this.device.update.total
		)
		{
			this.queueDisabled = true;
			await this.bluetooth.send(this.device.update.get());
		}
		else if (this.device.update.error !== 0)
		{
			this.queueDisabled = false;
		}

		if (this.device.update.end)
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
					this.device.update.firmwareUrl = res?.url ?? "";
					this.device.update.setIV(res?.iv);

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

	private getSHA(): void
	{
		this.sha = "";
		this.device.info.sha.forEach((x) =>
		{
			const hex = x.toString(16);
			this.sha += (hex.length === 1 ? "0" : "") + hex;
		});

		if (!this.device.value.activation)
		{
			getSerial(this.sha)
				.then((res: any) =>
				{
					this.device.config.serial = res?.sha ?? "";
					this.query(this.device.config, false, false, (success) =>
					{
						if (success)
						{
							this.rebootDevice(true);
							toast.success(t("activation.success"));
						}
						else
						{
							toast.error(t("activation.error"));
						}
					});
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
