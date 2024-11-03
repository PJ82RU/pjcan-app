import { IBaseModel } from "../base";

/** Интерфейс активации устройства */
export interface IDeviceActivation extends IBaseModel {
	serial: string; // Серийный номер
}
