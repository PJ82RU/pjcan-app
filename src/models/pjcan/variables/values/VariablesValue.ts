import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructVariablesValue } from "./StructVariablesValue";
import { IVariablesValue } from "./IVariablesValue";
import { ClimateValue } from "../climate";
import { ClockValue } from "../clock";
import { DoorsValue } from "../doors";
import { EngineValue } from "../engine";
import { FuelValue } from "../fuel";
import { MovementValue } from "../movement";
import { SensorsValue } from "../sensors";
import { TemperatureValue } from "../temperature";

export const API_EXEC_VARIABLE_VALUE = 102; // команда API
const STRUCT_LENGTH = 72; // длина данных API

const struct = new BluetoothStruct(StructVariablesValue);

/** Модель значений температуры */
export class VariablesValue extends BaseModel implements IVariablesValue
{
	climate = new ClimateValue();
	clock = new ClockValue();
	doors = new DoorsValue();
	engine = new EngineValue();
	fuel = new FuelValue();
	movement = new MovementValue();
	sensors = new SensorsValue();
	temperature = new TemperatureValue();

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_VALUE, STRUCT_LENGTH, struct);
	}
}
