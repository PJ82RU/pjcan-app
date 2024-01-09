import { IBaseModel } from "../base";
import { TCarModel } from "./TCarModel";

/** Интерфейс параметров автомобиля */
export interface IMazdaConfig extends IBaseModel {
	lcd: boolean; // Вкл/выкл вывод данных на LCD
	carModel: TCarModel; // Модель автомобиля
	logo: string; // Логотип
	hello: string; // Текст приветствия
}
