import { IDeviceValue } from "@/models/pjcan/device";
import { ILCDValue } from "@/models/pjcan/lcd";
import { IVariablesValue } from "@/models/pjcan/variables/values";

export interface IValues {
	device: IDeviceValue;
	lcd: ILCDValue;
	variable: IVariablesValue;
}
