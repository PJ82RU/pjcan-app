import { IBaseModel } from "../base";

/** Интерфейс конфигурации ДВС */
export interface IEngineConfig extends IBaseModel {
	showDays: boolean; // Показывать дни в моточасах
	totalWorktime: bigint; // Счетчик моточасов, сек.
	totalCountRPM: bigint; // Счетчик коленчатого вала (RPM), об.
}
