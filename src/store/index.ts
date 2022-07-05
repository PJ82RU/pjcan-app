import { lang } from '@/i18n/i18nUtils';
import { Bluetooth, BLUETOOTH_EVENT_RECEIVE } from '@/components/bluetooth';
import { UpdateFirmware } from '@/components/updateFirmware';
import { API_EXEC_VERSION, IVersion, Version } from '@/models/version';
import {
	ButtonsConfig,
	ButtonsValue,
	CarConfig,
	CarView,
	DeviceConfig,
	DeviceInfo,
	LCDValue,
	TeyesConfig,
	TeyesView,
	BoseConfig,
	BoseView,
	ClimateValue,
	ClimateView,
	DoorsValue,
	DoorsView,
	EngineConfig,
	EngineValue,
	EngineView,
	FuelConfig,
	FuelValue,
	FuelView,
	MovementValue,
	MovementView,
	SensorsValue,
	SensorsView,
	TemperatureValue,
	TemperatureView,
	VolumeConfig,
	VolumeView,
	Config,
	View,
	VariableView,
	VariableConfig,
	API_EXEC_BUTTONS_CONFIG,
	API_EXEC_BUTTONS_VALUE,
	API_EXEC_CAR_CONFIG,
	API_EXEC_CAR_VIEW,
	API_EXEC_DEVICE_CONFIG,
	API_EXEC_INFO,
	API_EXEC_LCD_VALUE,
	API_EXEC_TEYES_CONFIG,
	API_EXEC_TEYES_VIEW,
	API_EXEC_VARIABLE_BOSE,
	API_EXEC_VARIABLE_BOSE_VIEW,
	API_EXEC_VARIABLE_CLIMATE,
	API_EXEC_VARIABLE_CLIMATE_VIEW,
	API_EXEC_VARIABLE_DOORS,
	API_EXEC_VARIABLE_DOORS_VIEW,
	API_EXEC_VARIABLE_ENGINE_CONFIG,
	API_EXEC_VARIABLE_ENGINE,
	API_EXEC_VARIABLE_ENGINE_VIEW,
	API_EXEC_VARIABLE_FUEL_CONFIG,
	API_EXEC_VARIABLE_FUEL,
	API_EXEC_VARIABLE_FUEL_VIEW,
	API_EXEC_VARIABLE_MOVEMENT,
	API_EXEC_VARIABLE_MOVEMENT_VIEW,
	API_EXEC_VARIABLE_SENSORS,
	API_EXEC_VARIABLE_SENSORS_VIEW,
	API_EXEC_VARIABLE_TEMPERATURE,
	API_EXEC_VARIABLE_TEMPERATURE_VIEW,
	API_EXEC_VARIABLE_VOLUME,
	API_EXEC_VARIABLE_VOLUME_VIEW,
	API_EXEC_CONFIG,
	API_EXEC_VIEW,
	API_EXEC_UPDATE_UPLOAD_GZFILE,
	API_EXEC_UPDATE_BEGIN_GZ,
	API_EXEC_VARIABLE_VIEW,
	API_EXEC_VARIABLE_CONFIG,
	IButtonsConfig,
	IButtonValue,
	ICarConfig,
	ICarView,
	IDeviceConfig,
	IDeviceInfo,
	ILCDValue,
	ITeyesConfig,
	ITeyesView,
	IBoseConfig,
	IBoseView,
	IClimateValue,
	IClimateView,
	IDoorsValue,
	IDoorsView,
	IEngineConfig,
	IEngineValue,
	IEngineView,
	IFuelConfig,
	IFuelValue,
	IFuelView,
	IMovementValue,
	IMovementView,
	ISensorsValue,
	ISensorsView,
	ITemperatureValue,
	ITemperatureView,
	IVolumeConfig,
	IVolumeView,
	IConfig,
	IView,
	IVariableView,
	IVariableConfig
} from '@/models/pjcan';

export class Store {
	/** Bluetooth */
	bluetooth: Bluetooth = new Bluetooth();
	/** Объект обновление прошивки */
	updateFirmware: UpdateFirmware = new UpdateFirmware(this);

	/** Версия протокола */
	version: IVersion = new Version();

	/** Конфигурация кнопок */
	buttonConfig: IButtonsConfig = new ButtonsConfig();
	/** Текущее значение нажатой кнопки */
	buttonValue: IButtonValue = new ButtonsValue();

	/** Конфигурация автомобиля */
	carConfig: ICarConfig = new CarConfig();
	/** Конфигурация отображения значений автомобиля */
	carView: ICarView = new CarView();

	/** Конфигурация устройства */
	deviceConfig: IDeviceConfig = new DeviceConfig();
	/** Информация об устройстве ESP32 */
	deviceInfo: IDeviceInfo = new DeviceInfo();

	/** Значения LCD */
	lcdValue: ILCDValue = new LCDValue();

	/** Конфигурация Teyes */
	teyesConfig: ITeyesConfig = new TeyesConfig();
	/** Конфигурация отображения значений Teyes */
	teyesView: ITeyesView = new TeyesView();

	/** Конфигурация Bose */
	boseConfig: IBoseConfig = new BoseConfig();
	/** Конфигурация отображения значений Bose */
	boseView: IBoseView = new BoseView();

	/** Значения климат-контроля */
	climateValue: IClimateValue = new ClimateValue();
	/** Конфигурация отображения значений климат-контроля */
	climateView: IClimateView = new ClimateView();

	/** Значения открытых дверей */
	doorsValue: IDoorsValue = new DoorsValue();
	/** Конфигурация отображения значений открытых дверей */
	doorsView: IDoorsView = new DoorsView();

	/** Конфигурация ДВС */
	engineConfig: IEngineConfig = new EngineConfig();
	/** Значения ДВС */
	engineValue: IEngineValue = new EngineValue();
	/** Конфигурация отображения значений ДВС */
	engineView: IEngineView = new EngineView();

	/** Конфигурация расхода */
	fuelConfig: IFuelConfig = new FuelConfig();
	/** Значения расхода */
	fuelValue: IFuelValue = new FuelValue();
	/** Конфигурация отображения значений расхода */
	fuelView: IFuelView = new FuelView();

	/** Значения движения */
	movementValue: IMovementValue = new MovementValue();
	/** Конфигурация отображения значений движения */
	movementView: IMovementView = new MovementView();

	/** Значения датчиков */
	sensorValue: ISensorsValue = new SensorsValue();
	/** Конфигурация отображения значений датчиков */
	sensorView: ISensorsView = new SensorsView();

	/** Значения температуры */
	temperatureValue: ITemperatureValue = new TemperatureValue();
	/** Конфигурация отображения значений температуры */
	temperatureView: ITemperatureView = new TemperatureView();

	/** Конфигурация уровня звука */
	volumeConfig: IVolumeConfig = new VolumeConfig();
	/** Конфигурация отображения значений уровня звука */
	volumeView: IVolumeView = new VolumeView();

	constructor() {
		this.bluetooth.addListener(BLUETOOTH_EVENT_RECEIVE, (ev: any) => this.onReceive(ev));
	}

	/** Загрузка конфигурации */
	fetchConfig(): void {
		this.bluetooth.send(new Config().get()).then();
	}

	/** Загрузка конфигурации отображения значений */
	fetchView(): void {
		this.bluetooth.send(new View().get()).then();
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
				break;

			case API_EXEC_CONFIG: {
				let config: IConfig = new Config();
				if (config.set(data)) {
					this.buttonConfig = config.buttons;
					this.carConfig = config.car;
					this.teyesConfig = config.teyes;
					this.setVariableConfig(config.variable);
				}
				break;
			}

			case API_EXEC_VIEW: {
				let view: IView = new View();
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
