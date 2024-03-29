import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс параметров отображения данных движения */
export interface IMovementView extends IBaseModel {
	speed: IViewConfig;
	speedAVG: IViewConfig;
	restWay: IViewConfig;
}
