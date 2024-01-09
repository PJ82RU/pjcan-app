import { IDeviceInfo } from "./IDeviceInfo";
import { IDeviceConfig } from "./IDeviceConfig";
import { IDeviceValue } from "./IDeviceValue";
import { IDeviceUpdate } from "./IDeviceUpdate";

export interface IDevice {
	info: IDeviceInfo;
	config: IDeviceConfig;
	value: IDeviceValue;
	update: IDeviceUpdate;
}
