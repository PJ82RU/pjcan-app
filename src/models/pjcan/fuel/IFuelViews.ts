import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных расхода топлива */
export interface IFuelViews extends IBaseModel {
	current: IViewConfig;
	avg: IViewConfig;
}
