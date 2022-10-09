import { TButtonExec } from "./TButtonExec";

/** Интерфейс параметров кнопки */
export interface IButtonsConfigItem {
	hold: number; // время удержания кнопки, сек.
	inR: number; // сопротивление нажатий
	outR: number; // сопротивление эмуляции нажатий
	exec: TButtonExec[]; // список ID функций кнопки
}
