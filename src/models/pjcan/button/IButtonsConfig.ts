import { IBaseModel } from "../base";
import { IButtonsConfigItem } from "./IButtonsConfigItem";

/** Интерфейс кнопки */
export interface IButtonsConfig extends IBaseModel {
	enabled: boolean; // вкл/выкл. кнопок
	out: boolean; // вкл/выкл. эмуляции кнопок
	reset: boolean; // сбросить значения
	range: number; // диапазон сигнала (по умолчанию 10)
	items: IButtonsConfigItem[]; // настройки кнопок
}
