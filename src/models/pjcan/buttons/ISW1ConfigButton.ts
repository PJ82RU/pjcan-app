import { TButtonExec } from "./TButtonExec";

/** Интерфейс параметров кнопки */
export interface ISW1ConfigButton {
	extended: boolean; // Расширенный функционал кнопок (двойное, тройное нажатие)
	swtch: boolean; // Переключатель
	id: number; // ID кнопки (0 - кнопка не определена)
	resistanceTo: number; // Сопротивление кнопки до
	exec: TButtonExec[]; // Список ID функций кнопки
	execMode: TButtonExec[]; // Список ID функций кнопки в режиме mode
}
