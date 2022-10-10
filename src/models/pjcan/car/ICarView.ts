import { IBaseModel } from "../base";
import { IViewConfig } from "../view";

/** Интерфейс параметров отображения данных автомобиля */
export interface ICarView extends IBaseModel {
	logo: IViewConfig; // Логотип
	hello: IViewConfig; // Текст приветствия
}
