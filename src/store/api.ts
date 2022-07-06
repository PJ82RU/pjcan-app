import EventEmitter from 'eventemitter3';
import { lang } from '@/i18n/i18nUtils';
import { Bluetooth, BLUETOOTH_EVENT_RECEIVE } from '@/components/bluetooth';
import { API_EXEC_VERSION, IVersion, Version } from '@/models/version';
import { UpdateFirmware } from '@/components/updateFirmware';
import {
	API_EXEC_BUTTONS_CONFIG,
	API_EXEC_BUTTONS_VALUE,
	API_EXEC_CAR_CONFIG,
	API_EXEC_CAR_VIEW,
	API_EXEC_CONFIG,
	API_EXEC_DEVICE_CONFIG,
	API_EXEC_INFO,
	API_EXEC_LCD_VALUE,
	API_EXEC_TEYES_CONFIG,
	API_EXEC_TEYES_VIEW,
	API_EXEC_UPDATE_BEGIN_GZ,
	API_EXEC_UPDATE_UPLOAD_GZFILE,
	API_EXEC_VARIABLE_BOSE,
	API_EXEC_VARIABLE_BOSE_VIEW,
	API_EXEC_VARIABLE_CLIMATE,
	API_EXEC_VARIABLE_CLIMATE_VIEW,
	API_EXEC_VARIABLE_CONFIG,
	API_EXEC_VARIABLE_DOORS,
	API_EXEC_VARIABLE_DOORS_VIEW,
	API_EXEC_VARIABLE_ENGINE,
	API_EXEC_VARIABLE_ENGINE_CONFIG,
	API_EXEC_VARIABLE_ENGINE_VIEW,
	API_EXEC_VARIABLE_FUEL,
	API_EXEC_VARIABLE_FUEL_CONFIG,
	API_EXEC_VARIABLE_FUEL_VIEW,
	API_EXEC_VARIABLE_MOVEMENT,
	API_EXEC_VARIABLE_MOVEMENT_VIEW,
	API_EXEC_VARIABLE_SENSORS,
	API_EXEC_VARIABLE_SENSORS_VIEW,
	API_EXEC_VARIABLE_TEMPERATURE,
	API_EXEC_VARIABLE_TEMPERATURE_VIEW,
	API_EXEC_VARIABLE_VIEW,
	API_EXEC_VARIABLE_VOLUME,
	API_EXEC_VARIABLE_VOLUME_VIEW,
	API_EXEC_VIEW,
	BoseConfig,
	BoseView,
	ButtonsConfig,
	ButtonsValue,
	CarConfig,
	CarView,
	ClimateValue,
	ClimateView,
	Config,
	DeviceConfig,
	DeviceInfo,
	DoorsValue,
	DoorsView,
	EngineConfig,
	EngineValue,
	EngineView,
	FuelConfig,
	FuelValue,
	FuelView,
	IBaseModel,
	IConfig,
	IVariableConfig,
	IVariableView,
	IView,
	LCDValue,
	MovementValue,
	MovementView,
	SensorsValue,
	SensorsView,
	TemperatureValue,
	TemperatureView,
	TeyesConfig,
	TeyesView,
	VariableConfig,
	VariableView,
	View,
	VolumeConfig,
	VolumeView
} from '@/models/pjcan';

export const API_EVENT_BUTTONS_CONFIG = 'ButtonsConfig';
export const API_EVENT_BUTTONS_VALUE = 'ButtonsValue';
export const API_EVENT_CAR_CONFIG = 'CarConfig';
export const API_EVENT_CAR_VIEW = 'CarView';
export const API_EVENT_DEVICE_CONFIG = 'DeviceConfig';
export const API_EVENT_INFO = 'Info';
export const API_EVENT_LCD_VALUE = 'LCDValue';
export const API_EVENT_TEYES_CONFIG = 'TeyesConfig';
export const API_EVENT_TEYES_VIEW = 'TeyesView';
export const API_EVENT_VARIABLE_BOSE = 'VariableBose';
export const API_EVENT_VARIABLE_BOSE_VIEW = 'VariableBoseView';
export const API_EVENT_VARIABLE_CLIMATE = 'VariableClimate';
export const API_EVENT_VARIABLE_CLIMATE_VIEW = 'VariableClimateView';
export const API_EVENT_VARIABLE_DOORS = 'VariableDoors';
export const API_EVENT_VARIABLE_DOORS_VIEW = 'VariableDoorsView';
export const API_EVENT_VARIABLE_ENGINE = 'VariableEngine';
export const API_EVENT_VARIABLE_ENGINE_CONFIG = 'VariableEngineConfig';
export const API_EVENT_VARIABLE_ENGINE_VIEW = 'VariableEngineView';
export const API_EVENT_VARIABLE_FUEL = 'VariableFuel';
export const API_EVENT_VARIABLE_FUEL_CONFIG = 'VariableFuelConfig';
export const API_EVENT_VARIABLE_FUEL_VIEW = 'VariableFuelView';
export const API_EVENT_VARIABLE_MOVEMENT = 'VariableMovement';
export const API_EVENT_VARIABLE_MOVEMENT_VIEW = 'VariableMovementView';
export const API_EVENT_VARIABLE_SENSORS = 'VariableSensors';
export const API_EVENT_VARIABLE_SENSORS_VIEW = 'VariableSensorsView';
export const API_EVENT_VARIABLE_TEMPERATURE = 'VariableTemperature';
export const API_EVENT_VARIABLE_TEMPERATURE_VIEW = 'VariableTemperatureView';
export const API_EVENT_VARIABLE_VOLUME = 'VariableVolume';
export const API_EVENT_VARIABLE_VOLUME_VIEW = 'VariableVolumeView';

export class API extends EventEmitter {
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Версия протокола */
	version: IVersion = new Version();
	/** Обновление прошивки устройства PJCAN */
	updateFirmware: UpdateFirmware = new UpdateFirmware();

	constructor() {
		super();
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/** Загрузка конфигурации */
	fetchConfig(): Promise<void> {
		return this.bluetooth.send(new Config().get());
	}

	/** Загрузка конфигурации отображения значений */
	fetchView(): Promise<void> {
		return this.bluetooth.send(new View().get());
	}

	/**
	 * Отправить данные по Bluetooth.
	 * Отправка осуществляется не чаще одного раза в 250 мс для одного объекта данных.
	 * @param {IBaseModel} obj Объект данных
	 */
	send(obj: IBaseModel): void {
		if (!obj.lastSend || obj.lastSend === 0) {
			const data = obj.get();
			this.bluetooth.send(data).then();

			obj.lastSend = 1;
			obj.timeout = setTimeout(() => {
				if (obj.lastSend && obj.lastSend > 1) {
					obj.lastSend = 0;
					this.send(obj);
				} else obj.lastSend = 0;
				obj.timeout = undefined;
			}, 250);
		} else obj.lastSend++;
	}

	/**
	 * Событие входящих значений конфигурации
	 * @param {IVariableConfig} config Конфигурация
	 */
	private emitVariableConfig(config: IVariableConfig): void {
		this.emit(API_EVENT_VARIABLE_BOSE, config.bose);
		this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, config.engine);
		this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, config.fuel);
		this.emit(API_EVENT_VARIABLE_VOLUME, config.volume);
	}

	/**
	 * Событие входящих значений отображения
	 * @param {IVariableView} view Параметры отображения
	 */
	private emitVariableView(view: IVariableView): void {
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
	onReceive(data: DataView): void {
		switch (data.getUint8(0)) {
			case API_EXEC_VERSION:
				this.version.set(data);
				const { major, minor, build, revision } = this.version;
				console.log(
					lang('BLESrv_Version_Protocol')
						.replace('%0', major)
						.replace('%1', minor)
						.replace('%2', build)
						.replace('%3', revision)
				);
				this.fetchConfig().then(() => this.fetchView());
				break;

			case API_EXEC_CONFIG:
				{
					const config: IConfig = new Config(data);
					this.emit(API_EVENT_BUTTONS_CONFIG, config.buttons);
					this.emit(API_EVENT_CAR_CONFIG, config.car);
					this.emit(API_EVENT_TEYES_CONFIG, config.teyes);
					this.emitVariableConfig(config.variable);
				}
				break;

			case API_EXEC_VIEW:
				{
					const view: IView = new View(data);
					this.emit(API_EVENT_CAR_VIEW, view.car);
					this.emit(API_EVENT_TEYES_VIEW, view.teyes);
					this.emitVariableView(view.variable);
				}
				break;

			case API_EXEC_INFO:
				this.emit(API_EVENT_INFO, new DeviceInfo(data));
				break;
			case API_EXEC_DEVICE_CONFIG:
				this.emit(API_EVENT_DEVICE_CONFIG, new DeviceConfig(data));
				break;
			case API_EXEC_BUTTONS_CONFIG:
				this.emit(API_EVENT_BUTTONS_CONFIG, new ButtonsConfig(data));
				break;
			case API_EXEC_BUTTONS_VALUE:
				this.emit(API_EVENT_BUTTONS_VALUE, new ButtonsValue(data));
				break;
			case API_EXEC_TEYES_CONFIG:
				this.emit(API_EVENT_TEYES_CONFIG, new TeyesConfig(data));
				break;
			case API_EXEC_TEYES_VIEW:
				this.emit(API_EVENT_TEYES_VIEW, new TeyesView(data));
				break;
			case API_EXEC_LCD_VALUE:
				this.emit(API_EVENT_LCD_VALUE, new LCDValue(data));
				break;
			case API_EXEC_CAR_CONFIG:
				this.emit(API_EVENT_CAR_CONFIG, new CarConfig(data));
				break;
			case API_EXEC_CAR_VIEW:
				this.emit(API_EVENT_CAR_VIEW, new CarView(data));
				break;
			case API_EXEC_UPDATE_UPLOAD_GZFILE:
				this.updateFirmware.resultUpload.set(data);
				break;
			case API_EXEC_UPDATE_BEGIN_GZ:
				this.updateFirmware.resultBegin.set(data);
				break;

			case API_EXEC_VARIABLE_CONFIG: {
				this.emitVariableConfig(new VariableConfig(data));
				break;
			}

			case API_EXEC_VARIABLE_VIEW: {
				this.emitVariableView(new VariableView(data));
				break;
			}

			case API_EXEC_VARIABLE_BOSE:
				this.emit(API_EVENT_VARIABLE_BOSE, new BoseConfig(data));
				break;
			case API_EXEC_VARIABLE_BOSE_VIEW:
				this.emit(API_EVENT_VARIABLE_BOSE_VIEW, new BoseView(data));
				break;
			case API_EXEC_VARIABLE_CLIMATE:
				this.emit(API_EVENT_VARIABLE_CLIMATE, new ClimateValue(data));
				break;
			case API_EXEC_VARIABLE_CLIMATE_VIEW:
				this.emit(API_EVENT_VARIABLE_CLIMATE_VIEW, new ClimateView(data));
				break;
			case API_EXEC_VARIABLE_DOORS:
				this.emit(API_EVENT_VARIABLE_DOORS, new DoorsValue(data));
				break;
			case API_EXEC_VARIABLE_DOORS_VIEW:
				this.emit(API_EVENT_VARIABLE_DOORS_VIEW, new DoorsView(data));
				break;
			case API_EXEC_VARIABLE_ENGINE:
				this.emit(API_EVENT_VARIABLE_ENGINE, new EngineValue(data));
				break;
			case API_EXEC_VARIABLE_ENGINE_CONFIG:
				this.emit(API_EVENT_VARIABLE_ENGINE_CONFIG, new EngineConfig(data));
				break;
			case API_EXEC_VARIABLE_ENGINE_VIEW:
				this.emit(API_EVENT_VARIABLE_ENGINE_VIEW, new EngineView(data));
				break;
			case API_EXEC_VARIABLE_FUEL:
				this.emit(API_EVENT_VARIABLE_FUEL, new FuelValue(data));
				break;
			case API_EXEC_VARIABLE_FUEL_CONFIG:
				this.emit(API_EVENT_VARIABLE_FUEL_CONFIG, new FuelConfig(data));
				break;
			case API_EXEC_VARIABLE_FUEL_VIEW:
				this.emit(API_EVENT_VARIABLE_FUEL_VIEW, new FuelView(data));
				break;
			case API_EXEC_VARIABLE_MOVEMENT:
				this.emit(API_EVENT_VARIABLE_MOVEMENT, new MovementValue(data));
				break;
			case API_EXEC_VARIABLE_MOVEMENT_VIEW:
				this.emit(API_EVENT_VARIABLE_MOVEMENT_VIEW, new MovementView(data));
				break;
			case API_EXEC_VARIABLE_SENSORS:
				this.emit(API_EVENT_VARIABLE_SENSORS, new SensorsValue(data));
				break;
			case API_EXEC_VARIABLE_SENSORS_VIEW:
				this.emit(API_EVENT_VARIABLE_SENSORS_VIEW, new SensorsView(data));
				break;
			case API_EXEC_VARIABLE_TEMPERATURE:
				this.emit(API_EVENT_VARIABLE_TEMPERATURE, new TemperatureValue(data));
				break;
			case API_EXEC_VARIABLE_TEMPERATURE_VIEW:
				this.emit(API_EVENT_VARIABLE_TEMPERATURE_VIEW, new TemperatureView(data));
				break;
			case API_EXEC_VARIABLE_VOLUME:
				this.emit(API_EVENT_VARIABLE_VOLUME, new VolumeConfig(data));
				break;
			case API_EXEC_VARIABLE_VOLUME_VIEW:
				this.emit(API_EVENT_VARIABLE_VOLUME_VIEW, new VolumeView(data));
				break;
		}
	}
}

const api = new API();
export default api;
