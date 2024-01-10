import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных ДВС */
export interface IEngineViews extends IBaseModel {
	enabled: IViewConfig;
	totalWorktime: IViewConfig;
	totalCountRPM: IViewConfig;
	coolant: IViewConfig;
	rpm: IViewConfig;
	load: IViewConfig;
	throttle: IViewConfig;
}
