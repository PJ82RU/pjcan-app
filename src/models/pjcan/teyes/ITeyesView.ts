import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных Teyes */
export interface ITeyesView extends IBaseModel {
	view: IViewConfig;
}
