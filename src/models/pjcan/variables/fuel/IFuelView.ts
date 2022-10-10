import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных расхода топлива */
export interface IFuelView extends IBaseModel {
	consumption: IViewConfig;
	current: IViewConfig;
	avg: IViewConfig;
	total: IViewConfig;
}
