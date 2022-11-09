import EventEmitter from "eventemitter3";
import { $t } from "@/lang";
import {
	BLUETOOTH_EVENT_CONNECTED,
	BLUETOOTH_EVENT_RECEIVE,
	Bluetooth,
	TConnectedStatus
} from "@/components/bluetooth";

import { IBaseModel } from "@/models/pjcan/base";
import { API_EXEC_CONFIG, Configs, IConfigs } from "@/models/pjcan/configs";
import { API_EXEC_VIEW, Views, IViews } from "@/models/pjcan/views";
import { API_EXEC_VERSION, Version, IVersion } from "@/models/pjcan/version";
import { API_EXEC_VARIABLE_CONFIG, IVariableConfigs } from "@/models/pjcan/variables/configs";
import { API_EXEC_VARIABLE_VIEW, IVariableViews } from "@/models/pjcan/variables/views";
import {
	API_EXEC_DEVICE_CONFIG,
	API_EXEC_DEVICE_VALUE,
	API_EXEC_INFO,
	DeviceConfig,
	DeviceInfo,
	DeviceValue,
	IDevice
} from "@/models/pjcan/device";
import { API_EXEC_BUTTONS_CONFIG, API_EXEC_BUTTONS_VALUE, ButtonValue, IButtonValue } from "@/models/pjcan/button";
import { API_EXEC_TEYES_CONFIG, API_EXEC_TEYES_VIEW, ITeyesText, TeyesText } from "@/models/pjcan/teyes";
import { API_EXEC_LCD_VALUE, ILCDValue, LCDValue } from "@/models/pjcan/lcd";
import { API_EXEC_CAR_CONFIG, API_EXEC_CAR_VIEW } from "@/models/pjcan/car";
import { API_EXEC_UPDATE_BEGIN_GZ, API_EXEC_UPDATE_UPLOAD_GZ } from "@/models/pjcan/update";
import { API_EXEC_VARIABLE_BOSE, API_EXEC_VARIABLE_BOSE_VIEW } from "@/models/pjcan/variables/bose";
import {
	API_EXEC_VARIABLE_CLIMATE,
	API_EXEC_VARIABLE_CLIMATE_VIEW,
	ClimateValue
} from "@/models/pjcan/variables/climate";
import { API_EXEC_VARIABLE_DOORS, API_EXEC_VARIABLE_DOORS_VIEW, DoorsValue } from "@/models/pjcan/variables/doors";
import {
	API_EXEC_VARIABLE_ENGINE,
	API_EXEC_VARIABLE_ENGINE_CONFIG,
	API_EXEC_VARIABLE_ENGINE_VIEW,
	EngineValue
} from "@/models/pjcan/variables/engine";
import {
	API_EXEC_VARIABLE_FUEL,
	API_EXEC_VARIABLE_FUEL_CONFIG,
	API_EXEC_VARIABLE_FUEL_VIEW,
	FuelValue
} from "@/models/pjcan/variables/fuel";
import {
	API_EXEC_VARIABLE_MOVEMENT,
	API_EXEC_VARIABLE_MOVEMENT_VIEW,
	MovementValue
} from "@/models/pjcan/variables/movement";
import {
	API_EXEC_VARIABLE_SENSORS,
	API_EXEC_VARIABLE_SENSORS_VIEW,
	SensorsValue
} from "@/models/pjcan/variables/sensors";
import {
	API_EXEC_VARIABLE_TEMPERATURE,
	API_EXEC_VARIABLE_TEMPERATURE_VIEW,
	TemperatureValue
} from "@/models/pjcan/variables/temperature";
import { API_EXEC_VARIABLE_VOLUME, API_EXEC_VARIABLE_VOLUME_VIEW } from "@/models/pjcan/variables/volume";
import { IVariables } from "@/models/pjcan/variables/IVariables";

export const API_EVENT_VERSION = "Version";
export const API_EVENT_BUTTONS_CONFIG = "ButtonsConfig";
export const API_EVENT_BUTTON_VALUE = "ButtonsValue";
export const API_EVENT_CAR_CONFIG = "CarConfig";
export const API_EVENT_CAR_VIEW = "CarView";
export const API_EVENT_DEVICE_CONFIG = "DeviceConfig";
export const API_EVENT_DEVICE_VALUE = "DeviceValue";
export const API_EVENT_INFO = "Info";
export const API_EVENT_LCD_VALUE = "LCDValue";
export const API_EVENT_TEYES_CONFIG = "TeyesConfig";
export const API_EVENT_TEYES_VIEW = "TeyesView";
export const API_EVENT_VARIABLE_BOSE = "VariableBose";
export const API_EVENT_VARIABLE_BOSE_VIEW = "VariableBoseView";
export const API_EVENT_VARIABLE_CLIMATE = "VariableClimate";
export const API_EVENT_VARIABLE_CLIMATE_VIEW = "VariableClimateView";
export const API_EVENT_VARIABLE_DOORS = "VariableDoors";
export const API_EVENT_VARIABLE_DOORS_VIEW = "VariableDoorsView";
export const API_EVENT_VARIABLE_ENGINE = "VariableEngine";
export const API_EVENT_VARIABLE_ENGINE_CONFIG = "VariableEngineConfig";
export const API_EVENT_VARIABLE_ENGINE_VIEW = "VariableEngineView";
export const API_EVENT_VARIABLE_FUEL = "VariableFuel";
export const API_EVENT_VARIABLE_FUEL_CONFIG = "VariableFuelConfig";
export const API_EVENT_VARIABLE_FUEL_VIEW = "VariableFuelView";
export const API_EVENT_VARIABLE_MOVEMENT = "VariableMovement";
export const API_EVENT_VARIABLE_MOVEMENT_VIEW = "VariableMovementView";
export const API_EVENT_VARIABLE_SENSORS = "VariableSensors";
export const API_EVENT_VARIABLE_SENSORS_VIEW = "VariableSensorsView";
export const API_EVENT_VARIABLE_TEMPERATURE = "VariableTemperature";
export const API_EVENT_VARIABLE_TEMPERATURE_VIEW = "VariableTemperatureView";
export const API_EVENT_VARIABLE_VOLUME = "VariableVolume";
export const API_EVENT_VARIABLE_VOLUME_VIEW = "VariableVolumeView";
export const API_EVENT_UPDATE_UPLOAD_GZ = "UpdateUploadGZ";
export const API_EVENT_UPDATE_BEGIN_GZ = "UpdateBeginGZ";

const dev = process.env.NODE_ENV === "development";

export class Canbus extends EventEmitter
{
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Версия протокола */
	version: IVersion = new Version();
	/** Конфигурация устройства */
	configs: IConfigs = new Configs();
	/** Конфигурация отображения значений */
	views: IViews = new Views();
	/** Устройство */
	device: IDevice = {
		info: new DeviceInfo(),
		config: new DeviceConfig(),
		value: new DeviceValue()
	};
	/** Значения кнопки */
	buttonValue: IButtonValue = new ButtonValue();
	/** Текст Teyes */
	teyesText: ITeyesText = new TeyesText();
	/** Значения LCD */
	lcdValue: ILCDValue = new LCDValue();
	/** Значения */
	variables: IVariables = {
		climate: new ClimateValue(),
		doors: new DoorsValue(),
		engine: new EngineValue(),
		fuel: new FuelValue(),
		movement: new MovementValue(),
		sensors: new SensorsValue(),
		temperature: new TemperatureValue()
	};

	constructor()
	{
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (ev: any) => this.onConnected(ev));
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/**
	 * Событие подключения Bluetooth
	 * @param {TConnectedStatus} status Статус подключения
	 */
	onConnected(status: TConnectedStatus): void
	{
		if (status !== TConnectedStatus.CONNECT) return;

		this.fetchConfig().then(() => this.fetchView());
	}

	/** Загрузка конфигурации */
	fetchConfig(): Promise<void>
	{
		return this.bluetooth.send(this.configs.get());
	}

	/** Загрузка конфигурации отображения значений */
	fetchView(): Promise<void>
	{
		return this.bluetooth.send(this.views.get());
	}

	/**
	 * Отправить данные по Bluetooth.
	 * Отправка осуществляется не чаще одного раза в 250 мс для одного объекта данных.
	 * @param {IBaseModel} obj Объект данных
	 */
	send(obj: IBaseModel): void
	{
		if (!obj.lastSend || obj.lastSend === 0)
		{
			const data = obj.get();
			this.bluetooth.send(data).then();

			obj.lastSend = 1;
			obj.timeout = setTimeout(() =>
			{
				if (obj.lastSend && obj.lastSend > 1)
				{
					obj.lastSend = 0;
					this.send(obj);
				}
				else obj.lastSend = 0;
				obj.timeout = undefined;
			}, 250);
		}
		else obj.lastSend++;
	}

	/**
	 * Событие входящих значений конфигурации
	 * @param {IVariableConfigs} config Конфигурация
	 */
	private emitVariableConfig(config: IVariableConfigs): void
	{
		this.emit(API_EVENT_VARIABLE_BOSE, config.bose);
		this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, config.engine);
		this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, config.fuel);
		this.emit(API_EVENT_VARIABLE_VOLUME, config.volume);
	}

	/**
	 * Событие входящих значений отображения
	 * @param {IVariableViews} view Параметры отображения
	 */
	private emitVariableView(view: IVariableViews): void
	{
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
	 * Входящие данные
	 * @param data Данные
	 */
	onReceive(data: DataView): void
	{
		switch (data.getUint8(0))
		{
			case API_EXEC_VERSION:
				this.version.set(data);
				if (dev)
				{
					const { major, minor, build, revision } = this.version;
					console.log(
						$t("BLE.server.versionProtocol", { mj: major, mn: minor, bl: build, rv: revision })
					);
				}
				this.emit(API_EVENT_VERSION, this.version);
				break;

			case API_EXEC_CONFIG:
				this.configs.set(data);
				this.emit(API_EVENT_BUTTONS_CONFIG, this.configs.buttons);
				this.emit(API_EVENT_CAR_CONFIG, this.configs.car);
				this.emit(API_EVENT_TEYES_CONFIG, this.configs.teyes);
				this.emitVariableConfig(this.configs.variable);
				break;

			case API_EXEC_VIEW:
				this.views.set(data);
				this.emit(API_EVENT_CAR_VIEW, this.views.car);
				this.emit(API_EVENT_TEYES_VIEW, this.views.teyes);
				this.emitVariableView(this.views.variable);
				break;

			case API_EXEC_INFO:
				this.device.info.set(data);
				this.emit(API_EVENT_INFO, this.device.info);
				break;
			case API_EXEC_DEVICE_CONFIG:
				this.device.config.set(data);
				this.emit(API_EVENT_DEVICE_CONFIG, this.device.config);
				break;
			case API_EXEC_DEVICE_VALUE:
				this.device.value.set(data);
				this.emit(API_EVENT_DEVICE_VALUE, this.device.value);
				break;
			case API_EXEC_BUTTONS_CONFIG:
				this.configs.buttons.set(data);
				this.emit(API_EVENT_BUTTONS_CONFIG, this.configs.buttons);
				break;
			case API_EXEC_BUTTONS_VALUE:
				this.buttonValue.set(data);
				this.emit(API_EVENT_BUTTON_VALUE, this.buttonValue);
				break;
			case API_EXEC_TEYES_CONFIG:
				this.configs.teyes.set(data);
				this.emit(API_EVENT_TEYES_CONFIG, this.configs.teyes);
				break;
			case API_EXEC_TEYES_VIEW:
				this.views.teyes.set(data);
				this.emit(API_EVENT_TEYES_VIEW, this.views.teyes);
				break;
			case API_EXEC_LCD_VALUE:
				this.lcdValue.set(data);
				this.emit(API_EVENT_LCD_VALUE, this.lcdValue);
				break;
			case API_EXEC_CAR_CONFIG:
				this.configs.car.set(data);
				this.emit(API_EVENT_CAR_CONFIG, this.configs.car);
				break;
			case API_EXEC_CAR_VIEW:
				this.views.car.set(data);
				this.emit(API_EVENT_CAR_VIEW, this.views.car);
				break;
			case API_EXEC_UPDATE_UPLOAD_GZ:
				this.emit(API_EVENT_UPDATE_UPLOAD_GZ, data);
				break;
			case API_EXEC_UPDATE_BEGIN_GZ:
				this.emit(API_EVENT_UPDATE_BEGIN_GZ, data);
				break;

			case API_EXEC_VARIABLE_CONFIG: {
				this.configs.variable.set(data);
				this.emitVariableConfig(this.configs.variable);
				break;
			}

			case API_EXEC_VARIABLE_VIEW: {
				this.views.variable.set(data);
				this.emitVariableView(this.views.variable);
				break;
			}

			case API_EXEC_VARIABLE_BOSE:
				this.configs.variable.bose.set(data);
				this.emit(API_EVENT_VARIABLE_BOSE, this.configs.variable.bose);
				break;
			case API_EXEC_VARIABLE_BOSE_VIEW:
				this.views.variable.bose.set(data);
				this.emit(API_EVENT_VARIABLE_BOSE_VIEW, this.views.variable.bose);
				break;
			case API_EXEC_VARIABLE_CLIMATE:
				this.variables.climate.set(data);
				this.emit(API_EVENT_VARIABLE_CLIMATE, this.variables.climate);
				break;
			case API_EXEC_VARIABLE_CLIMATE_VIEW:
				this.views.variable.climate.set(data);
				this.emit(API_EVENT_VARIABLE_CLIMATE_VIEW, this.views.variable.climate);
				break;
			case API_EXEC_VARIABLE_DOORS:
				this.variables.doors.set(data);
				this.emit(API_EVENT_VARIABLE_DOORS, this.variables.doors);
				break;
			case API_EXEC_VARIABLE_DOORS_VIEW:
				this.views.variable.doors.set(data);
				this.emit(API_EVENT_VARIABLE_DOORS_VIEW, this.views.variable.doors);
				break;
			case API_EXEC_VARIABLE_ENGINE:
				this.variables.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE, this.variables.engine);
				break;
			case API_EXEC_VARIABLE_ENGINE_CONFIG:
				this.configs.variable.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, this.configs.variable.engine);
				break;
			case API_EXEC_VARIABLE_ENGINE_VIEW:
				this.views.variable.engine.set(data);
				this.emit(API_EVENT_VARIABLE_ENGINE_VIEW, this.views.variable.engine);
				break;
			case API_EXEC_VARIABLE_FUEL:
				this.variables.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL, this.variables.fuel);
				break;
			case API_EXEC_VARIABLE_FUEL_CONFIG:
				this.configs.variable.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, this.configs.variable.fuel);
				break;
			case API_EXEC_VARIABLE_FUEL_VIEW:
				this.views.variable.fuel.set(data);
				this.emit(API_EVENT_VARIABLE_FUEL_VIEW, this.views.variable.fuel);
				break;
			case API_EXEC_VARIABLE_MOVEMENT:
				this.variables.movement.set(data);
				this.emit(API_EVENT_VARIABLE_MOVEMENT, this.variables.movement);
				break;
			case API_EXEC_VARIABLE_MOVEMENT_VIEW:
				this.views.variable.movement.set(data);
				this.emit(API_EVENT_VARIABLE_MOVEMENT_VIEW, this.views.variable.movement);
				break;
			case API_EXEC_VARIABLE_SENSORS:
				this.variables.sensors.set(data);
				this.emit(API_EVENT_VARIABLE_SENSORS, this.variables.sensors);
				break;
			case API_EXEC_VARIABLE_SENSORS_VIEW:
				this.views.variable.movement.set(data);
				this.emit(API_EVENT_VARIABLE_SENSORS_VIEW, this.views.variable.movement);
				break;
			case API_EXEC_VARIABLE_TEMPERATURE:
				this.variables.temperature.set(data);
				this.emit(API_EVENT_VARIABLE_TEMPERATURE, this.variables.temperature);
				break;
			case API_EXEC_VARIABLE_TEMPERATURE_VIEW:
				this.views.variable.temperature.set(data);
				this.emit(API_EVENT_VARIABLE_TEMPERATURE_VIEW, this.views.variable.temperature);
				break;
			case API_EXEC_VARIABLE_VOLUME:
				this.configs.variable.volume.set(data);
				this.emit(API_EVENT_VARIABLE_VOLUME, this.configs.variable.volume);
				break;
			case API_EXEC_VARIABLE_VOLUME_VIEW:
				this.views.variable.volume.set(data);
				this.emit(API_EVENT_VARIABLE_VOLUME_VIEW, this.views.variable.volume);
				break;
		}
	}
}

const canbus = new Canbus();
export default canbus;
