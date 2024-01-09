import { IBaseModel } from "../base";

/** Интерфейс значений ДВС */
export interface IEngineValue extends IBaseModel {
	on: boolean; // Статус работы двигателя
	coolant: number; // Температура охлаждающей жидкости
	rpm: number; // Количество оборотов коленчатого вала (RPM)
	worktime: number; // Время работы двигателя с момента его запуска, сек.
	countRPM: number; // Счетчик RPM с момента запуска двигателя, об.
	load: number; // Нагрузка на ДВС, % (n/1000)
	throttle: number; // Положение дроссельной заслонки, % (n/100)
	viewDays: number; // Счетчик моточасов, дней
	viewHours: number; // Счетчик моточасов, часов
	viewMinutes: number; // Счетчик моточасов, минут
	viewSeconds: number; // Счетчик моточасов, секунд
	viewCountRPM: number; // Счетчик коленчатого вала (RPM), тыс.об.
}
