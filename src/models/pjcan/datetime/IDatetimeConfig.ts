import { IBaseModel } from "../base";

/** Интерфейс значений часов */
export interface IDatetimeConfig extends IBaseModel {
	showDate: boolean; // Показать дату
	showTime: boolean; // Показать время
	showDayWeek: boolean; // Показать день недели
	showDateAndDayWeek: boolean; // Показать дату и день недели
	showTimeAndDayWeek: boolean; // Показать время и день недели
	showFullDatetime: boolean; // Показать полную дату и время
	timezone: number; // Временная зона
	unixtime: number; // UnixTime
}
