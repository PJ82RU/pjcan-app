import { IBaseModel } from "../base";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	disableLedWork: boolean; // Выключить управление контакта LED_WORK
	disableReverse: boolean; // Выключить управление контакта REVERSE
	disableRPosition: boolean; // Выключить управление контакта R_POSITION
	disableAmpIllum: boolean; // Выключить управление контакта AMP_ILLUM
	disableVoltmeter: boolean; // Выключить вольтметр
	calibrationOfVoltmeter: number; // Калибровка вольтметра
}
