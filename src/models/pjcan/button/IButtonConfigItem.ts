import { TButtonExec } from "./TButtonExec";

/** Интерфейс параметров кнопки */
export interface IButtonConfigItem {
	extended: boolean; // Расширенный функционал кнопок
	hold: number; // Время удержания кнопки, сек.
	resistance: number; // Сопротивление нажатий
	exec: TButtonExec[]; // Список ID функций кнопки
	execMode: TButtonExec[]; // Список ID функций кнопки в режиме mode
}
