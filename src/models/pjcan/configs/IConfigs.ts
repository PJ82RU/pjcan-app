import { IBaseModel } from "../base";
import { IButtonsConfig } from "../button";
import { ICarConfig } from "../car";
import { ITeyesConfig } from "../teyes";
import { IVariableConfigs } from "../variables/configs";

export interface IConfigs extends IBaseModel {
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfigs;
}
