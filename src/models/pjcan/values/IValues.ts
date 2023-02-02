import { IBaseModel } from "../base";
import { IDeviceValue } from "../device";
import { ILCDValue } from "../lcd";
import { IVariablesValue } from "../variables/values";

export interface IValues extends IBaseModel {
	device: IDeviceValue;
	lcd: ILCDValue;
	variable: IVariablesValue;
}
