import { IBaseModel } from "@/models/pjcan/base";

export interface IDeviceScannerAction extends IBaseModel {
	enabled: boolean; // Включить сканирование
	shutdown: number; // Таймаут выключения сканирования при бездействии, сек
}
