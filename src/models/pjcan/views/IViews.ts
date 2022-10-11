import { IBaseModel } from "../base";
import { ICarView } from "../car";
import { ITeyesView } from "../teyes";
import { IVariableViews } from "../variables/views";

export interface IViews extends IBaseModel {
	car: ICarView;
	teyes: ITeyesView;
	variable: IVariableViews;
}
