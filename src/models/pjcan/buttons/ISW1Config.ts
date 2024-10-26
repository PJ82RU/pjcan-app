import { IBaseModel } from "../base";
import { ISW1ConfigButton } from "./ISW1ConfigButton";

/** Интерфейс кнопки */
export interface ISW1Config extends IBaseModel {
	hold: number; // Время удержания кнопки, сек.
	buttons: ISW1ConfigButton[]; // Параметры кнопок
}
