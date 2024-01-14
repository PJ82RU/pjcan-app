import { IBaseModel } from "../base";

export interface IChoiceValue extends IBaseModel {
	listID: number[]; // Список ID запросов
}
