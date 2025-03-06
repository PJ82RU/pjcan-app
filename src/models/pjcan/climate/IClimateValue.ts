import { IBaseModel } from "../base";

export interface IClimateZone {
	airFlowLegs: boolean; // Направление воздушного потока в ноги
	airFlowBody: boolean; // Направление воздушного потока в туловище
	airFlowUp: boolean; // Направление воздушного потока вверх
	heatedSeat: number; // Подогрев сиденья. Режим: 0..3
	airRate: number; // Уровень воздушного потока: 0 - выкл, 1..7 - уровень, >7 - максимальный режим обдува
	temperature: number; // Температура, n/10
}

/** Интерфейс значений климата */
export interface IClimateValue extends IBaseModel {
	power: boolean; // Вкл/выкл. блока LCD климата
	automode: boolean; // Автоматический режим климата
	dual: boolean; // Режим двухзонного климата
	ac: boolean; // Режим работы кондиционера
	eco: boolean; // Режим eco
	airAuto: boolean; // Автоматический режим работы обдува
	airIntake: boolean; // Режим забора воздуха: true - рециркуляция, false - снаружи автомобиля
	heatedFrontWindow: boolean; // Режим обдува/подогрева лобового стекла
	heatedRearWindow: boolean; // Режим подогрева заднего стекла
	temperatureCelsius: boolean; // Значение температуры: true - в Цельсиях, false - в Фаренгейтах
	driver: IClimateZone; // Водитель
	passenger: IClimateZone; // Пассажир

	// переменные для совместимости
	_airDLegs?: boolean; // Направление воздушного потока в ноги
	_airDBody?: boolean; // Направление воздушного потока в туловище
	_airDWindshield?: boolean; // Направление воздушного потока в ветровое стекло
	_dBackWin?: boolean; // Подогрев заднего стекла
	_airInside?: boolean; // Забор воздуха из салона
	_airOutside?: boolean; // Забор воздуха снаружи
	_temperatureSettable?: boolean; // Режим установки температуры
	_temperatureAmb?: boolean; // Режим отображения температуры за бортом или текущая
	_temperatureFahrenheit?: boolean; // Показать значения температуры в Фаренгейтах
	_airRate?: number; // Скорость воздушного потока (от минимального 1 до максимального 7)
	_temperature?: number; // Температура (n/10)
}
