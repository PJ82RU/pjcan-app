import { IBaseModel } from "../base";
import { IButtonConfigItem } from "./IButtonConfigItem";

/** Интерфейс кнопки */
export interface IButtonsConfig extends IBaseModel {
	enabled: boolean; // Вкл/выкл кнопок
	programming: boolean; // Отправлять значение нажатой кнопки
	items: IButtonConfigItem[]; // Параметры кнопок
}
