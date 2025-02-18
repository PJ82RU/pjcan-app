import { IBaseModel } from "../base";

/** Интерфейс значений температуры */
export interface ITemperatureValue extends IBaseModel {
	isIn: boolean; // Наличие значения температуры в салоне
	isOut: boolean; // Наличие значения температуры снаружи
	in: number; // Температура в салоне
	out: number; // Температура снаружи
}
