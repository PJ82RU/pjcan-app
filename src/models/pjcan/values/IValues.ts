import { IBaseModel } from "../base";
import { IVersion } from "@/models/pjcan/version";
import { IDeviceValue } from "../device";
import { ILCDValue } from "../lcd";
import { IVariablesValue } from "../variables/values";

export interface IValues extends IBaseModel {
	version: IVersion;
	device: IDeviceValue;
	lcd: ILCDValue;
	variable: IVariablesValue;
}
