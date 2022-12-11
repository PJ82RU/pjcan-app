import { IBaseModel } from "../base";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	resetConfig: boolean; // Сбросить конфигурацию
	resetView: boolean; // Сбросить конфигурацию отображения
	led: number; // Состояние мигания светодиода
}
