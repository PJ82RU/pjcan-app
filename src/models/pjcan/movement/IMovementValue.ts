import { IBaseModel } from "../base";

/** Интерфейс значений движения */
export interface IMovementValue extends IBaseModel {
	speed: number; // Скорость автомобиля, км/ч (n/100)
	speedAVG: number; // Средняя скорость, км/ч
	restWay: number; // Остаток пути, км (n/100)
}
