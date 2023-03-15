import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructClimateValue } from "./StructClimateValue";
import { IClimateValue } from "./IClimateValue";

export const API_VARIABLE_CLIMATE_EXEC = 120;
export const API_SIZE_VARIABLE_CLIMATE = 7;

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
	visible = false;
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_CLIMATE_EXEC, API_SIZE_VARIABLE_CLIMATE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_CLIMATE_EXEC, API_SIZE_VARIABLE_CLIMATE + 1, struct);
	}
}
