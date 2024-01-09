import { IBaseModel } from "../base";

/** Интерфейс значений климата */
export interface IClimateValue extends IBaseModel {
	on: boolean; // Вкл/выкл. блока LCD климата
	automode: boolean; // Автоматический режим работы блока климата
	ac: boolean; // Статус работы кондиционера
	eco: boolean; // Режим eco
	airDLegs: boolean; // Направление воздушного потока в ноги
	airDBody: boolean; // Направление воздушного потока в туловище
	airDWindshield: boolean; // Направление воздушного потока в ветровое стекло
	dBackWin: boolean; // Подогрев заднего стекла
	airInside: boolean; // Забор воздуха из салона
	airOutside: boolean; // Забор воздуха снаружи
	temperatureSettable: boolean; // Режим установки температуры
	temperatureAmb: boolean; // Режим отображения температуры за бортом или текущая
	temperatureCelsius: boolean; // Показать значения температуры в Цельсиях
	temperatureFahrenheit: boolean; // Показать значения температуры в Фаренгейтах
	airRate: number; // Скорость воздушного потока (от минимального 1 до максимального 7)
	temperature: number; // Температура (n/10)
}
