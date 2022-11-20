import { IBaseModel } from "../base";
import { IButtonsConfigItem } from "./IButtonsConfigItem";

/** Интерфейс кнопки */
export interface IButtonsConfig extends IBaseModel {
	/** Вкл/выкл кнопок */
	enabled: boolean;
	/** Вкл/выкл эмуляции кнопок */
	out: boolean;
	/** Сбросить значения */
	reset: boolean;
	/** Отправлять значение нажатой кнопки */
	sendValue: boolean;
	/** Диапазон сигнала (по умолчанию 10) */
	range: number;
	/** Настройки кнопок */
	items: IButtonsConfigItem[];
}
