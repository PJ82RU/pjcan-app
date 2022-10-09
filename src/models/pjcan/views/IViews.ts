import { IBaseModel } from "@/models/pjcan/base";
import { ICarView } from "../car";
import { ITeyesView } from "../teyes";
import { IVariableView } from "../variables/VariablesView";

export interface IViews extends IBaseModel {
	car: ICarView;
	teyes: ITeyesView;
	variable: IVariableView;
}
