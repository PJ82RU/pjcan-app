import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_TEMPERATURE_SIZE, StructTemperatureValue } from "./StructTemperatureValue";
import { ITemperatureValue } from "./ITemperatureValue";

export const API_VARIABLE_TEMPERATURE_EXEC = 180;

const struct = new BluetoothStruct(StructTemperatureValue);

/** Модель значений температуры */
export class TemperatureValue extends BaseModel implements ITemperatureValue
{
	in = 0;
	out = 0;

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
		return this._set(this, API_VARIABLE_TEMPERATURE_EXEC, API_VARIABLE_TEMPERATURE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_TEMPERATURE_EXEC, API_VARIABLE_TEMPERATURE_SIZE + 1, struct);
	}
}
