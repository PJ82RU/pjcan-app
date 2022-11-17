import { IBaseModel } from "../base";
import { IButtonsConfig } from "../button";
import { ICarConfig } from "../car";
import { ITeyesConfig } from "../teyes";
import { IVariableConfigs } from "../variables/configs";
import { IVersion } from "../version";

export interface IConfigs extends IBaseModel {
	version: IVersion;
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfigs;
}
