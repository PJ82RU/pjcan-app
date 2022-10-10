import { IBaseModel } from "../../base";

/** Интерфейс значений движения */
export interface IMovementValue extends IBaseModel {
	speed: number;
	speedAVG: number;
	restWay: number;
}
