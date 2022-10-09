import { IBaseModel } from "./IBaseModel";

/** Интерфейс параметров автомобиля */
export interface ICarConfig extends IBaseModel {
	lcd: boolean; // вкл. вывод данных на LCD
	carModel: number; // модель автомобиля
	logo: string; // логотип
	hello: string; // текст приветствия
}
