import { IBaseModel } from "../base";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	led: number; // Состояние мигания светодиода
}
