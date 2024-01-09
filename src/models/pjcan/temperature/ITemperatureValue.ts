import { IBaseModel } from "../base";

/** Интерфейс значений температуры */
export interface ITemperatureValue extends IBaseModel {
	in: number; // Температура в салоне (n/10)
	out: number; // Температура окружающего среды (n/10)
}
