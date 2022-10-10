import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных климата */
export interface IClimateView extends IBaseModel {
	climate: IViewConfig;
}
