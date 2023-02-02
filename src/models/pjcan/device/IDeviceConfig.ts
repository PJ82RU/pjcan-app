import { IBaseModel } from "../base";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	serial: string; // Серийный номер
}
