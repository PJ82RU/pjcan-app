import { IBaseModel } from "../base";

/** Интерфейс значений кнопки */
export interface IButtonValue extends IBaseModel {
	index: number; // Индекс кнопки (-1 если кнопка не определена)
	exec: number; // ID функции кнопки
	execMode: number; // ID функции кнопки в режиме mode
	count: number; // Счетчик нажатий кнопки
	type: number; // Тип действия
	resistance: number; // Значение сопротивления кнопки
}
