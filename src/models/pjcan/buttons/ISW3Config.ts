import { IBaseModel } from "../base";
import { ISW3ConfigButton } from "./ISW3ConfigButton";

/** Интерфейс кнопки */
export interface ISW3Config extends IBaseModel {
	buttons: ISW3ConfigButton[]; // Параметры кнопок
}
