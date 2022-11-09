import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных температуры */
export interface ITemperatureView extends IBaseModel {
	view: IViewConfig;
}
