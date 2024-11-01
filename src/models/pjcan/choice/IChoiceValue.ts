import { IBaseModel } from "../base";

export interface IChoiceValue extends IBaseModel {
	repeat: number; // Повтор с интервалом repeat * 250. repeat === 0 - выкл.
	listID: number[]; // Список ID запросов
}
