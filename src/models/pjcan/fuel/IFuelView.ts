import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных расхода топлива */
export interface IFuelView extends IBaseModel {
	current: IViewConfig;
	avg: IViewConfig;
}
