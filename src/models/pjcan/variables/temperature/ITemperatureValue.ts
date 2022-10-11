import { IBaseModel } from "../../base";

/** Интерфейс значений температуры */
export interface ITemperatureValue extends IBaseModel {
	in: number;
	out: number;
}
