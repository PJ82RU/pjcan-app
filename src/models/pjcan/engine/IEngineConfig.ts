import { IBaseModel } from "../base";

/** Интерфейс конфигурации ДВС */
export interface IEngineConfig extends IBaseModel {
	showDays: boolean; // Показывать дни в моточасах
	totalWorktime: BigInt; // Счетчик моточасов, сек.
	totalCountRPM: BigInt; // Счетчик коленчатого вала (RPM), об.
}
