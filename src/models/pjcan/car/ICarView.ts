import { IBaseModel } from "./IBaseModel";
import { IViewConfig } from "../view/ViewConfig";

/** Интерфейс параметров отображения данных автомобиля */
export interface ICarView extends IBaseModel {
	logo: IViewConfig; // Логотип
	hello: IViewConfig; // Текст приветствия
}
