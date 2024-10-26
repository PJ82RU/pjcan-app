import { IBaseModel } from "../base";
import { TButtonPress } from "./TButtonPress";
import { TButtonExec } from "./TButtonExec";

export interface IButtonValue extends IBaseModel {
	pressed: boolean; // Кнопка нажата
	swtch: boolean; // Переключатель
	emulation: boolean; // Эмуляция нажатия физической кнопки
	id: number; // ID кнопки (0 - кнопка не определена)
	btnType: TButtonPress; // Тип действия (тип sw_press_t)
	btnExec: TButtonExec; // Функция к выполнению
	resistance: number; // Значение сопротивления кнопки
}
