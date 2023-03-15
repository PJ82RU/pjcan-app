// noinspection DuplicatedCode

import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructVariablesValue } from "./StructVariablesValue";
import { IVariablesValue } from "./IVariablesValue";
import { API_SIZE_VARIABLE_CLIMATE, ClimateValue } from "../climate";
import { API_SIZE_VARIABLE_CLOCK, ClockValue } from "../clock";
import { API_SIZE_VARIABLE_DOORS, DoorsValue } from "../doors";
import { API_SIZE_VARIABLE_ENGINE, EngineValue } from "../engine";
import { API_SIZE_VARIABLE_FUEL, FuelValue } from "../fuel";
import { API_SIZE_VARIABLE_MOVEMENT, MovementValue } from "../movement";
import { API_SIZE_VARIABLE_SENSORS, SensorsValue } from "../sensors";
import { API_SIZE_VARIABLE_TEMPERATURE, TemperatureValue } from "../temperature";
import { API_SIZE_VARIABLE_VOLUME, VolumeValue } from "../volume";

export const API_VARIABLE_VALUE_EXEC = 102;
export const API_SIZE_VARIABLE_VALUE =
	API_SIZE_VARIABLE_CLIMATE +
	API_SIZE_VARIABLE_CLOCK +
	API_SIZE_VARIABLE_DOORS +
	API_SIZE_VARIABLE_ENGINE +
	API_SIZE_VARIABLE_FUEL +
	API_SIZE_VARIABLE_MOVEMENT +
	API_SIZE_VARIABLE_SENSORS +
	API_SIZE_VARIABLE_TEMPERATURE +
	API_SIZE_VARIABLE_VOLUME;

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
	volume = new VolumeValue();

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
		const result = this._set(this, API_VARIABLE_VALUE_EXEC, API_SIZE_VARIABLE_VALUE + 1, struct, buf);
		if (result)
		{
			this.climate.isData = true;
			this.doors.isData = true;
			this.engine.isData = true;
			this.fuel.isData = true;
			this.movement.isData = true;
			this.sensors.isData = true;
			this.temperature.isData = true;
			this.volume.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VALUE_EXEC, API_SIZE_VARIABLE_VALUE + 1, struct);
	}
}
