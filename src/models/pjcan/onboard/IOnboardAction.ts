import { IBaseModel } from "../base";
import { TButtonExec } from "../buttons";

export interface IOnboardAction extends IBaseModel {
	btnEmulation: boolean; // Эмуляция нажатия физической кнопки
	btnExec: TButtonExec; // Функция к выполнению
}
