import { IBaseModel } from "../base";

export interface IDeviceHardware {
	major: number;
	minor: number;
	build: number;
	revision: number;
}

/** Интерфейс значений устройства */
export interface IDeviceValue extends IBaseModel {
	activation: boolean; // Статус активации
	state_led_work: boolean; // Текущее состояние контакта LED_WORK
	state_reverse: boolean; // Текущее состояние контакта REVERSE
	state_r_position: boolean; // Текущее состояние контакта R_POSITION
	state_amp_illum: boolean; // Текущее состояние контакта AMP_ILLUM
	hardware: IDeviceHardware; // Версия платы
	led: number; // Состояние мигания светодиода
	voltmeter: number; // Значение вольтметра (n/100)
	worktime: number; // Время работы устройства, сек
}
