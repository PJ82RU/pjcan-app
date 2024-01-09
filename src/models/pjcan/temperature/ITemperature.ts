import { ITemperatureValue } from "./ITemperatureValue";
import { IViewConfig } from "../view";

export interface ITemperature {
	value: ITemperatureValue;
	view: IViewConfig;
}
