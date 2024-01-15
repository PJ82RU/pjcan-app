import { IBaseModel } from "../base";

/** Интерфейс конфигурации расхода топлива */
export interface IFuelConfig extends IBaseModel {
	ratio: number; // Коэффициент (n/1000) 0.001 до 1
}
