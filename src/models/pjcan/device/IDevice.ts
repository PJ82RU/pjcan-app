import { IDeviceInfo } from "./IDeviceInfo";
import { IDeviceConfig } from "./IDeviceConfig";

export interface IDevice {
	/** Информация об устройстве */
	info: IDeviceInfo;
	/** Конфигурация устройства */
	config: IDeviceConfig;
}
