import { IBaseModel } from "../base";
import { TCarModel } from "./TCarModel";

/** Интерфейс параметров автомобиля */
export interface IOnboardConfig extends IBaseModel {
	lcd: boolean; // Вкл/выкл вывод данных на LCD
	lcdClock24: boolean; // 24-часовой формат времени на экране БК
	carModel: TCarModel; // Модель автомобиля
	logo: string; // Логотип
	hello: string; // Текст приветствия
}
