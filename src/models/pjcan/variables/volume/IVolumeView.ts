import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных уровня звука */
export interface IVolumeView extends IBaseModel {
	view: IViewConfig;
}
