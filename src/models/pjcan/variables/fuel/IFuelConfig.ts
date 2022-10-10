import { IBaseModel } from "../../base";

/** Интерфейс конфигурации расхода топлива */
export interface IFuelConfig extends IBaseModel {
	ratio: number;
}
