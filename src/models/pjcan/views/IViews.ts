import { IBaseModel } from "../base";
import { ICarView } from "../car";
import { ITeyesView } from "../teyes";
import { IVariableView } from "../variables/views/VariablesView";

export interface IViews extends IBaseModel {
	car: ICarView;
	teyes: ITeyesView;
	variable: IVariableView;
}
