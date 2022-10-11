import { IBaseModel } from "../../base";
import { TSensorsSignal } from "./TSensorsSignal";

/** Интерфейс значений датчиков */
export interface ISensorsValue extends IBaseModel {
	acc: boolean;
	handbrake: boolean;
	reverse: boolean;
	seatbeltDriver: boolean;
	seatbeltPassenger: boolean;
	signal: TSensorsSignal;
}
