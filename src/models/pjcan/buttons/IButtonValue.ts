import { IBaseModel } from "../base";
import { TButtonExec } from "./TButtonExec";
import { TButtonType } from "./TButtonType";

/** Интерфейс значений кнопки */
export interface IButtonValue extends IBaseModel {
	index: number; // Индекс кнопки (-1 если кнопка не определена)
	btnExec: TButtonExec; // ID функции кнопки
	btnExecMode: TButtonExec; // ID функции кнопки в режиме mode
	count: number; // Счетчик нажатий кнопки
	type: TButtonType; // Тип действия
	resistance: number; // Значение сопротивления кнопки
}
