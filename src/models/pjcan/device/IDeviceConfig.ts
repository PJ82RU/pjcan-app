import { IBaseModel } from "./IBaseModel";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	led: number; // Состояние мигания светодиода
}
