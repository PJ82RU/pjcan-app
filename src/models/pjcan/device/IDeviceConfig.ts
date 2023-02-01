import { IBaseModel } from "../base";

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	resetConfig: boolean; // Сбросить конфигурацию
	resetView: boolean; // Сбросить конфигурацию отображения
	activation: boolean; // Статус активации
	save: boolean; // Сохранить данные принудительно
	led: number; // Состояние мигания светодиода
	sha: number[]; // Хеш
	serial: string; // Серийный номер
}
