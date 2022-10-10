import { IBaseModel } from "../../base";

/** Интерфейс значений климата */
export interface IClimateValue extends IBaseModel {
	enabled: boolean;
	automode: boolean;
	ac: boolean;
	airDLegs: boolean;
	airDBody: boolean;
	airDWindshield: boolean;
	visible: boolean;
	airRate: number;
	airType: TAir;
	tempType: number;
	tempDisplay: number;
	temperature: number;
}
