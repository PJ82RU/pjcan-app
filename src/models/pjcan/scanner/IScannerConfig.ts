import { IBaseModel } from "@/models/pjcan/base";

export interface IScannerConfig extends IBaseModel {
	enabled: boolean; // Включить сканирование
	addSend: boolean; // Фиксировать исходящие данные
	timeoutOff: number; // Таймаут выключения сканирования при бездействии, сек
}
