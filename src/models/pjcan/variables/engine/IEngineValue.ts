import { IBaseModel } from "../../base";

/** Интерфейс значений ДВС */
export interface IEngineValue extends IBaseModel {
	enabled: boolean;
	coolant: number;
	rpm: number;
	mseconds: number;
	totalSeconds: number;
	totalCountRPM: number;
	countRPM: number;
	load: number;
	throttle: number;
}
