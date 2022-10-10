import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных ДВС */
export interface IEngineView extends IBaseModel {
	enabled: IViewConfig;
	totalSeconds: IViewConfig;
	totalCountRPM: IViewConfig;
	coolant: IViewConfig;
	rpm: IViewConfig;
	load: IViewConfig;
	throttle: IViewConfig;
}
