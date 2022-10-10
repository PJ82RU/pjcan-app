import { IBaseModel } from "../base";

/** Интерфейс значений кнопки */
export interface IButtonValue extends IBaseModel {
	index: number; // индекс кнопки (-1 если кнопка не определена)
	exec: number; // id функции кнопки
	count: number; // счетчик нажатий кнопки
	type: number; // тип действия
	r: number; // значение сопротивления кнопки
}
