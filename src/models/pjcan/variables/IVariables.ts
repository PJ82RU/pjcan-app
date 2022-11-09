import { IClimateValue } from "./climate";
import { IDoorsValue } from "./doors";
import { IEngineValue } from "./engine";
import { IFuelValue } from "./fuel";
import { IMovementValue } from "./movement";
import { ISensorsValue } from "./sensors";
import { ITemperatureValue } from "./temperature";

export interface IVariables {
	/** Значения климат-контроля */
	climate: IClimateValue;
	/** Значения дверей */
	doors: IDoorsValue;
	/** Значения двигателя */
	engine: IEngineValue;
	/** Значения расхода */
	fuel: IFuelValue;
	/** Значения движения */
	movement: IMovementValue;
	/** Значения датчиков */
	sensors: ISensorsValue;
	/** Значения температуры */
	temperature: ITemperatureValue;
}
