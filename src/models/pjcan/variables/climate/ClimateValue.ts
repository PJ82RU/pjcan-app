import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_CLIMATE_SIZE, StructClimateValue } from "./StructClimateValue";
import { IClimateValue } from "./IClimateValue";

export const API_VARIABLE_CLIMATE_EXEC = 120;
export const API_VARIABLE_CLIMATE_EVENT = "VariableClimateValue";

const struct = new BluetoothStruct(StructClimateValue);

/** Модель значений климата */
export class ClimateValue extends BaseModel implements IClimateValue
{
	enabled = false;
	automode = false;
	ac = false;
	airDLegs = false;
	airDBody = false;
	airDWindshield = false;
	airDBackWin = false;
	eco = false;
	airRate = 0;
	airType = 0;
	tempType = 0;
	tempDisplay = 0;
	temperature = 0;

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_CLIMATE_EXEC, API_VARIABLE_CLIMATE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_CLIMATE_EXEC, API_VARIABLE_CLIMATE_SIZE + 1, struct);
	}
}
