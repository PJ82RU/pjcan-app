import { IBaseModel } from "../base";

/** Интерфейс параметров автомобиля */
export interface IMazdaConfig extends IBaseModel {
	lcd: boolean; // Вкл/выкл вывод данных на LCD
	carModel: number; // Модель автомобиля
	logo: string; // Логотип
	hello: string; // Текст приветствия
}
