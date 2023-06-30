import { IBaseModel } from "../../base";

/** Интерфейс значений ДВС */
export interface IEngineValue extends IBaseModel {
	enabled: boolean;
	coolant: number;
	rpm: number;
	worktime: number;
	countRPM: number;
	load: number;
	throttle: number;
	viewDays: number;
	viewHours: number;
	viewMinutes: number;
	viewSeconds: number;
	viewCountRPM: number;

	mseconds?: number;			// <-- 4.0.1.96
	totalSeconds?: number;		// <-- 4.0.1.96
	totalCountRPM?: number;		// <-- 4.0.1.96
}
