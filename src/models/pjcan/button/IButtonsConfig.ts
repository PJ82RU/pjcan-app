import { IBaseModel } from "../base";
import { IButtonConfigItem } from "./IButtonConfigItem";

/** Интерфейс кнопки */
export interface IButtonsConfig extends IBaseModel {
	enabled: boolean; // Вкл/выкл кнопок
	sendValue: boolean; // Отправлять значение нажатой кнопки
	range: number; // Диапазон сигнала
	items: IButtonConfigItem[]; // Параметры кнопок
}
