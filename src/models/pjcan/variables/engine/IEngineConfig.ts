import { IBaseModel } from "../../base";

/** Интерфейс конфигурации ДВС */
export interface IEngineConfig extends IBaseModel {
	showDays: boolean;
	totalSeconds: bigint | number;
	totalCountRPM: bigint | number;
}
