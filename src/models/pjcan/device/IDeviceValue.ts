import { IBaseModel } from "../base";
import { EDeviceType } from "./EDeviceType";
import { EDeviceAddons } from "./EDeviceAddons";

export interface IDeviceHardware {
	major: number;
	minor: number;
	build: number;
	revision: number;
}

/** Интерфейс значений устройства */
export interface IDeviceValue extends IBaseModel {
	activation: boolean; // Статус активации
	stateLedWork: boolean; // Текущее состояние контакта LED_WORK
	stateReverse: boolean; // Текущее состояние контакта REVERSE
	stateRPosition: boolean; // Текущее состояние контакта R_POSITION
	stateAmpIllum: boolean; // Текущее состояние контакта AMP
	configSave: boolean; // Статус сохранения конфигурации
	hardware: IDeviceHardware; // Версия платы
	led: number; // Состояние мигания светодиода
	voltmeter: number; // Значение вольтметра (n/100)
	worktime: number; // Время работы устройства, сек
	type: EDeviceType; // Тип устройства
	addons: EDeviceAddons; // Тип дополнения
}
