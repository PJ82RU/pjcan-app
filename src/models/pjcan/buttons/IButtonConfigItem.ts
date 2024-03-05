import { TButtonExec } from "./TButtonExec";

/** Интерфейс параметров кнопки */
export interface IButtonConfigItem {
	extended: boolean; // Расширенный функционал кнопок
	id: number; // ID кнопки (0 - кнопка не определена)
	hold: number; // Время удержания кнопки, сек.
	resistanceMin: number; // Минимальное сопротивление кнопки
	resistanceMax: number; // Максимальное сопротивление кнопки
	exec: TButtonExec[]; // Список ID функций кнопки
	execMode: TButtonExec[]; // Список ID функций кнопки в режиме mode
}
