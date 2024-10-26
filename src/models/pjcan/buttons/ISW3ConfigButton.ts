import { TButtonExec } from "./TButtonExec";

/** Интерфейс параметров кнопки */
export interface ISW3ConfigButton {
	id: number; // ID кнопки (0 - кнопка не определена)
	resistanceTo: number; // Сопротивление кнопки до
	exec: TButtonExec; // ID функций кнопки
}
