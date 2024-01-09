import { IBaseModel } from "../base";
import { TCenterPoint } from "./TCenterPoint";

/** Интерфейс параметров Bose */
export interface IBoseConfig extends IBaseModel {
	on: boolean; // Вкл/выкл Bose
	audioPlt: boolean; // Audio PLT
	radioFM: boolean; // Radio FM или AM
	wow: boolean; // Wow
	press: boolean; // Нажатие кнопки
	balance: number; // Баланс (от -8 до +8)
	bass: number; // Бас (от -6 до +6)
	fade: number; // Fade (от -8 до +8)
	treble: number; // Treble (от -6 до +6)
	centerPoint: TCenterPoint; // Center point
}
