import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных датчиков */
export interface ISensorsView extends IBaseModel {
	handbrake: IViewConfig;
	reverse: IViewConfig;
	seatbelt: IViewConfig;
	turnSignal: IViewConfig;
}
