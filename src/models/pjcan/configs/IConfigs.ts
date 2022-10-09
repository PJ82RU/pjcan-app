import { IBaseModel } from "../base/BaseModel";
import { IButtonsConfig } from "../button";
import { ICarConfig } from "../car";
import { ITeyesConfig } from "../teyes";
import { IVariableConfig } from "../variables/VariablesConfig";

export interface IConfigs extends IBaseModel {
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfig;
}
