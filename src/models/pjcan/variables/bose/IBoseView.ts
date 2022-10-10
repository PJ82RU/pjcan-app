import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных Bose */
export interface IBoseView extends IBaseModel {
	bose: IViewConfig;
}
