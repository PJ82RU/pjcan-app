import Bluetooth, { BLUETOOTH_EVENT_RECEIVE } from '@/components/bluetooth/bluetooth';
import ButtonsConfig, { API_EXEC_BUTTONS_CONFIG, IButtonsConfig } from '@/models/pjcan/button/config';
import ButtonsValue, { API_EXEC_BUTTONS_VALUE, IButtonValue } from '@/models/pjcan/button/value';
import CarConfig, { API_EXEC_CAR_CONFIG, ICarConfig } from '@/models/pjcan/car/config';
import CarView, { API_EXEC_CAR_VIEW, ICarView } from '@/models/pjcan/car/view';
import DeviceConfig, { API_EXEC_DEVICE_CONFIG, IDeviceConfig } from '@/models/pjcan/device/config';
import DeviceInfo, { API_EXEC_INFO, IDeviceInfo } from '@/models/pjcan/device/info';
import LCDValue, { API_EXEC_LCD_VALUE, ILCDValue } from '@/models/pjcan/lcd/value';
import TeyesConfig, { API_EXEC_TEYES_CONFIG, ITeyesConfig } from '@/models/pjcan/teyes/config';
import TeyesView, { API_EXEC_TEYES_VIEW, ITeyesView } from '@/models/pjcan/teyes/view';
import BoseConfig, { API_EXEC_VARIABLE_BOSE, IBoseConfig } from '@/models/pjcan/variables/bose/config';
import BoseView, { API_EXEC_VARIABLE_BOSE_VIEW, IBoseView } from '@/models/pjcan/variables/bose/view';
import ClimateValue, { API_EXEC_VARIABLE_CLIMATE, IClimateValue } from '@/models/pjcan/variables/climate/value';
import ClimateView, { API_EXEC_VARIABLE_CLIMATE_VIEW, IClimateView } from '@/models/pjcan/variables/climate/view';
import DoorsValue, { API_EXEC_VARIABLE_DOORS, IDoorsValue } from '@/models/pjcan/variables/doors/value';
import DoorsView, { API_EXEC_VARIABLE_DOORS_VIEW, IDoorsView } from '@/models/pjcan/variables/doors/view';
import EngineConfig, { API_EXEC_VARIABLE_ENGINE_CONFIG, IEngineConfig } from '@/models/pjcan/variables/engine/config';
import EngineValue, { API_EXEC_VARIABLE_ENGINE, IEngineValue } from '@/models/pjcan/variables/engine/value';
import EngineView, { API_EXEC_VARIABLE_ENGINE_VIEW, IEngineView } from '@/models/pjcan/variables/engine/view';
import FuelConfig, { API_EXEC_VARIABLE_FUEL_CONFIG, IFuelConfig } from '@/models/pjcan/variables/fuel/config';
import FuelValue, { API_EXEC_VARIABLE_FUEL, IFuelValue } from '@/models/pjcan/variables/fuel/value';
import FuelView, { API_EXEC_VARIABLE_FUEL_VIEW, IFuelView } from '@/models/pjcan/variables/fuel/view';
import MovementValue, { API_EXEC_VARIABLE_MOVEMENT, IMovementValue } from '@/models/pjcan/variables/movement/value';
import MovementView, { API_EXEC_VARIABLE_MOVEMENT_VIEW, IMovementView } from '@/models/pjcan/variables/movement/view';
import SensorsValue, { API_EXEC_VARIABLE_SENSORS, ISensorsValue } from '@/models/pjcan/variables/sensors/value';
import SensorsView, { API_EXEC_VARIABLE_SENSORS_VIEW, ISensorsView } from '@/models/pjcan/variables/sensors/view';
import TemperatureValue, {
	API_EXEC_VARIABLE_TEMPERATURE,
	ITemperatureValue
} from '@/models/pjcan/variables/temperature/value';
import TemperatureView, {
	API_EXEC_VARIABLE_TEMPERATURE_VIEW,
	ITemperatureView
} from '@/models/pjcan/variables/temperature/view';
import VolumeConfig, { API_EXEC_VARIABLE_VOLUME, IVolumeConfig } from '@/models/pjcan/variables/volume/config';
import VolumeView, { API_EXEC_VARIABLE_VOLUME_VIEW, IVolumeView } from '@/models/pjcan/variables/volume/view';
import PJCANConfig, { API_EXEC_CONFIG, IPJCANConfig } from '@/models/pjcan/config';
import PJCANView, { API_EXEC_VIEW, IPJCANView } from '@/models/pjcan/view';
import { API_EXEC_UPDATE_UPLOAD_GZFILE } from '@/models/pjcan/update/upload';
import { API_EXEC_UPDATE_BEGIN_GZ } from '@/models/pjcan/update/begin';
import VariableView, { API_EXEC_VARIABLE_VIEW, IVariableView } from '@/models/pjcan/variables/view';
import VariableConfig, { API_EXEC_VARIABLE_CONFIG, IVariableConfig } from '@/models/pjcan/variables/config';
import { API_EXEC_VERSION, IVersion, Version } from '@/models/version';
import UpdateFirmware from '@/components/update-firmware/update-firmware';

export class PJCANStore {
	/** Bluetooth */
	public bluetooth: Bluetooth = new Bluetooth();
	/** Объект обновление прошивки */
	public updateFirmware: UpdateFirmware = new UpdateFirmware();

	/** Версия протокола */
	public version: IVersion = new Version();

	/** Конфигурация кнопок */
	public buttonConfig: IButtonsConfig = new ButtonsConfig();
	/** Текущее значение нажатой кнопки */
	public buttonValue: IButtonValue = new ButtonsValue();

	/** Конфигурация автомобиля */
	public carConfig: ICarConfig = new CarConfig();
	/** Конфигурация отображения значений автомобиля */
	public carView: ICarView = new CarView();

	/** Конфигурация устройства */
	public deviceConfig: IDeviceConfig = new DeviceConfig();
	/** Информация об устройстве ESP32 */
	public deviceInfo: IDeviceInfo = new DeviceInfo();

	/** Значения LCD */
	public lcdValue: ILCDValue = new LCDValue();

	/** Конфигурация Teyes */
	public teyesConfig: ITeyesConfig = new TeyesConfig();
	/** Конфигурация отображения значений Teyes */
	public teyesView: ITeyesView = new TeyesView();

	/** Конфигурация Bose */
	public boseConfig: IBoseConfig = new BoseConfig();
	/** Конфигурация отображения значений Bose */
	public boseView: IBoseView = new BoseView();

	/** Значения климат-контроля */
	public climateValue: IClimateValue = new ClimateValue();
	/** Конфигурация отображения значений климат-контроля */
	public climateView: IClimateView = new ClimateView();

	/** Значения открытых дверей */
	public doorsValue: IDoorsValue = new DoorsValue();
	/** Конфигурация отображения значений открытых дверей */
	public doorsView: IDoorsView = new DoorsView();

	/** Конфигурация ДВС */
	public engineConfig: IEngineConfig = new EngineConfig();
	/** Значения ДВС */
	public engineValue: IEngineValue = new EngineValue();
	/** Конфигурация отображения значений ДВС */
	public engineView: IEngineView = new EngineView();

	/** Конфигурация расхода */
	public fuelConfig: IFuelConfig = new FuelConfig();
	/** Значения расхода */
	public fuelValue: IFuelValue = new FuelValue();
	/** Конфигурация отображения значений расхода */
	public fuelView: IFuelView = new FuelView();

	/** Значения движения */
	public movementValue: IMovementValue = new MovementValue();
	/** Конфигурация отображения значений движения */
	public movementView: IMovementView = new MovementView();

	/** Значения датчиков */
	public sensorValue: ISensorsValue = new SensorsValue();
	/** Конфигурация отображения значений датчиков */
	public sensorView: ISensorsView = new SensorsView();

	/** Значения температуры */
	public temperatureValue: ITemperatureValue = new TemperatureValue();
	/** Конфигурация отображения значений температуры */
	public temperatureView: ITemperatureView = new TemperatureView();

	/** Конфигурация уровня звука */
	public volumeConfig: IVolumeConfig = new VolumeConfig();
	/** Конфигурация отображения значений уровня звука */
	public volumeView: IVolumeView = new VolumeView();

	constructor() {
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/** Загрузка конфигурации */
	public fetchConfig(): void {
		this.bluetooth.send(new PJCANConfig().get());
	}

	/** Загрузка конфигурации отображения значений */
	public fetchView(): void {
		this.bluetooth.send(new PJCANView().get());
	}

	private setVariableConfig(config: IVariableConfig): void {
		this.boseConfig = config.bose;
		this.engineConfig = config.engine;
		this.fuelConfig = config.fuel;
		this.volumeConfig = config.volume;
	}

	private setVariableView(view: IVariableView): void {
		this.boseView = view.bose;
		this.climateView = view.climate;
		this.doorsView = view.doors;
		this.engineView = view.engine;
		this.fuelView = view.fuel;
		this.movementView = view.movement;
		this.sensorView = view.sensors;
		this.temperatureView = view.temperature;
		this.volumeView = view.volume;
	}

	/**
	 * Входящие данные
	 * @param data Данные
	 */
	public onReceive(data: DataView): void {
		switch (data.getUint8(0)) {
			case API_EXEC_VERSION:
				this.version.set(data);
				console.log(
					`Версия протокола: ${this.version.major}.${this.version.minor}.${this.version.build}.${this.version.revision}`
				);
				break;

			case API_EXEC_CONFIG: {
				let config: IPJCANConfig = new PJCANConfig();
				if (config.set(data)) {
					this.buttonConfig = config.buttons;
					this.carConfig = config.car;
					this.teyesConfig = config.teyes;
					this.setVariableConfig(config.variable);
				}
				break;
			}

			case API_EXEC_VIEW: {
				let view: IPJCANView = new PJCANView();
				if (view.set(data)) {
					this.carView = view.car;
					this.teyesView = view.teyes;
					this.setVariableView(view.variable);
				}
				break;
			}

			case API_EXEC_INFO:
				this.deviceInfo.set(data);
				break;
			case API_EXEC_DEVICE_CONFIG:
				this.deviceConfig.set(data);
				break;
			case API_EXEC_BUTTONS_CONFIG:
				this.buttonConfig.set(data);
				break;
			case API_EXEC_BUTTONS_VALUE:
				this.buttonValue.set(data);
				break;
			case API_EXEC_TEYES_CONFIG:
				this.teyesConfig.set(data);
				break;
			case API_EXEC_TEYES_VIEW:
				this.teyesView.set(data);
				break;
			case API_EXEC_LCD_VALUE:
				this.lcdValue.set(data);
				break;
			case API_EXEC_CAR_CONFIG:
				this.carConfig.set(data);
				break;
			case API_EXEC_CAR_VIEW:
				this.carView.set(data);
				break;
			case API_EXEC_UPDATE_UPLOAD_GZFILE:
				this.updateFirmware.resultUpload.set(data);
				break;
			case API_EXEC_UPDATE_BEGIN_GZ:
				this.updateFirmware.resultBegin.set(data);
				break;

			case API_EXEC_VARIABLE_CONFIG: {
				let config: IVariableConfig = new VariableConfig();
				if (config.set(data)) this.setVariableConfig(config);
				break;
			}

			case API_EXEC_VARIABLE_VIEW: {
				let view: IVariableView = new VariableView();
				if (view.set(data)) this.setVariableView(view);
				break;
			}

			case API_EXEC_VARIABLE_BOSE:
				this.boseConfig.set(data);
				break;
			case API_EXEC_VARIABLE_BOSE_VIEW:
				this.boseView.set(data);
				break;
			case API_EXEC_VARIABLE_CLIMATE:
				this.climateValue.set(data);
				break;
			case API_EXEC_VARIABLE_CLIMATE_VIEW:
				this.climateView.set(data);
				break;
			case API_EXEC_VARIABLE_DOORS:
				this.doorsValue.set(data);
				break;
			case API_EXEC_VARIABLE_DOORS_VIEW:
				this.doorsView.set(data);
				break;
			case API_EXEC_VARIABLE_ENGINE:
				this.engineValue.set(data);
				break;
			case API_EXEC_VARIABLE_ENGINE_CONFIG:
				this.engineConfig.set(data);
				break;
			case API_EXEC_VARIABLE_ENGINE_VIEW:
				this.engineView.set(data);
				break;
			case API_EXEC_VARIABLE_FUEL:
				this.fuelValue.set(data);
				break;
			case API_EXEC_VARIABLE_FUEL_CONFIG:
				this.fuelConfig.set(data);
				break;
			case API_EXEC_VARIABLE_FUEL_VIEW:
				this.fuelView.set(data);
				break;
			case API_EXEC_VARIABLE_MOVEMENT:
				this.movementValue.set(data);
				break;
			case API_EXEC_VARIABLE_MOVEMENT_VIEW:
				this.movementView.set(data);
				break;
			case API_EXEC_VARIABLE_SENSORS:
				this.sensorValue.set(data);
				break;
			case API_EXEC_VARIABLE_SENSORS_VIEW:
				this.sensorView.set(data);
				break;
			case API_EXEC_VARIABLE_TEMPERATURE:
				this.temperatureValue.set(data);
				break;
			case API_EXEC_VARIABLE_TEMPERATURE_VIEW:
				this.temperatureView.set(data);
				break;
			case API_EXEC_VARIABLE_VOLUME:
				this.volumeConfig.set(data);
				break;
			case API_EXEC_VARIABLE_VOLUME_VIEW:
				this.volumeView.set(data);
				break;
		}
	}
}

const index = new PJCANStore();
export default index;
