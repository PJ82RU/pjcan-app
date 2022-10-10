import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IEngineValue, StructEngineValue } from "./index";

export const API_EXEC_VARIABLE_ENGINE = 140; // команда API
const STRUCT_LENGTH = 21; // длина данных API

const struct = new BluetoothStruct(StructEngineValue);

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue
{
	enabled = false;
	coolant = 0;
	rpm = 0;
	mseconds = 0;
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_ENGINE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_ENGINE, STRUCT_LENGTH, struct);
	}
}
