import { IBaseModel } from "../base";
import { TCenterPoint } from "./TCenterPoint";

/** Интерфейс параметров Bose */
export interface IBoseConfig extends IBaseModel {
	on: boolean; // Вкл/выкл Bose
	audioPlt: boolean; // Audio PLT
	radioFM: boolean; // Radio FM или AM
	wow: boolean; // Wow
	press: boolean; // Нажатие кнопки
	mute: boolean; // Выкл. звук
	start: boolean; // Изменять уровень звука при включении адаптера
	volume: number; // Уровень звука (от 0 до 63)
	start_volume: number; // Уровень звука при включении адаптера (от 0 до 63)
	balance: number; // Баланс (от -8 до +8)
	bass: number; // Бас (от -6 до +6)
	fade: number; // Fade (от -8 до +8)
	treble: number; // Treble (от -6 до +6)
	centerPoint: TCenterPoint; // Center point
}
