import { IBaseModel } from "../base";

/** Интерфейс значений устройства */
export interface IDeviceValue extends IBaseModel {
	activation: boolean; // Статус активации
	led: number; // Состояние мигания светодиода
	worktime: Number; // Время работы устройства, сек
}
