import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_ENGINE_SIZE, StructEngineValue } from "./StructEngineValue";
import { IEngineValue } from "./IEngineValue";

export const API_VARIABLE_ENGINE_EXEC = 140;
export const API_VARIABLE_ENGINE_EVENT = "VariableEngineValue";

const struct = new BluetoothStruct(StructEngineValue);

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue
{
	enabled = false;
	coolant = 0;
	rpm = 0;
	mseconds = 0;
	totalSeconds = 0;
	totalCountRPM = 0;
	countRPM = 0;
	load = 0;
	throttle = 0;

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
		return this._set(this, API_VARIABLE_ENGINE_EXEC, API_VARIABLE_ENGINE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_ENGINE_EXEC, API_VARIABLE_ENGINE_SIZE + 1, struct);
	}
}
