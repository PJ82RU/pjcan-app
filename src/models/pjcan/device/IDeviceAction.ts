import { IBaseModel } from "../base";

/** Интерфейс действий устройства */
export interface IDeviceAction extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	resetConfig: boolean; // Сбросить конфигурацию
	resetView: boolean; // Сбросить конфигурацию отображения
	save: boolean; // Сохранить данные принудительно
	format: boolean; // Форматирование SPIFFS с сохранением параметров
}
