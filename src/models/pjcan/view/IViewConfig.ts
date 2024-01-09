import { IBaseModel } from "../base";
import { TViewType } from "./TViewType";

/** Интерфейс параметров отображения */
export interface IViewConfig extends IBaseModel {
	enabled: boolean; // Вкл/выкл отображения
	type: TViewType; // Тип отображения текста
	time: number; // Время отображения на LCD, сек.
	delay: number; // Время паузы отображения на LCD, сек.
}
