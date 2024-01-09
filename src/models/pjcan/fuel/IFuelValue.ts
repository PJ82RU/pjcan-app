import { IBaseModel } from "../base";

/** Интерфейс значений расхода топлива */
export interface IFuelValue extends IBaseModel {
	current: number;
	avg: number;
}
