import { IBaseModel } from "../base";

/** Интерфейс значений устройства */
export interface IDeviceValue extends IBaseModel {
	activation: boolean; // Статус активации
	hardware: number; // Версия платы
	led: number; // Состояние мигания светодиода
	worktime: number; // Время работы устройства, сек
}
