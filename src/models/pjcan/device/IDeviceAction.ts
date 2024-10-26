import { IBaseModel } from "../base";

/** Интерфейс действий устройства */
export interface IDeviceAction extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	resetConfig: boolean; // Сбросить конфигурацию
	resetView: boolean; // Сбросить конфигурацию отображения
	resetButtons: boolean; // Сбросить конфигурацию кнопок
	save: boolean; // Сохранить данные принудительно
	format: boolean; // Форматирование SPIFFS без сохранения параметров
}
