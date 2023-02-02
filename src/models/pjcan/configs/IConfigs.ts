import { IBaseModel } from "../base";
import { IDeviceConfig } from "@/models/pjcan/device";
import { IButtonsConfig } from "../button";
import { ICarConfig } from "../car";
import { ITeyesConfig } from "../teyes";
import { IVariableConfigs } from "../variables/configs";

export interface IConfigs extends IBaseModel {
	device: IDeviceConfig;
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfigs;
}
