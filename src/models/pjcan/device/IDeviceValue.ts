import { IBaseModel } from "../base";

/** Интерфейс значений устройства */
export interface IDeviceValue extends IBaseModel {
	activation: boolean; // Статус активации
	led: number; // Состояние мигания светодиода
	worktime: number; // Время работы устройства, сек
}
