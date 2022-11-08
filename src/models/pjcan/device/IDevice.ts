import { IDeviceInfo } from "./IDeviceInfo";
import { IDeviceConfig } from "./IDeviceConfig";
import { IDeviceValue } from "./IDeviceValue";

export interface IDevice {
	/** Информация об устройстве */
	info: IDeviceInfo;
	/** Конфигурация устройства */
	config: IDeviceConfig;
	/** Значения устройства */
	value: IDeviceValue;
}
