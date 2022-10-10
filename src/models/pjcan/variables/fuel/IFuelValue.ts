import { IBaseModel } from "../../base";

/** Интерфейс значений расхода топлива */
export interface IFuelValue extends IBaseModel {
	consumption: number;
	current: number;
	avg: number;
	total: number;
}
