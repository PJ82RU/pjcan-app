import { IBaseModel } from "./IBaseModel";
import { IViewConfig } from "./ViewConfig";

/** Интерфейс параметров отображения данных Teyes */
export interface ITeyesView extends IBaseModel {
	teyes: IViewConfig;
}
