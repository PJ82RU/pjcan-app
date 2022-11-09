import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных дверей */
export interface IDoorsView extends IBaseModel {
	view: IViewConfig;
}
