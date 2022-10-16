import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructFuelValue } from "./StructFuelValue";
import { IFuelValue } from "./IFuelValue";

export const API_EXEC_VARIABLE_FUEL = 150; // команда API
const STRUCT_LENGTH = 17; // длина данных API

const struct = new BluetoothStruct(StructFuelValue);

/** Модель значений расхода топлива */
export class FuelValue extends BaseModel implements IFuelValue
{
	consumption = 0;
	current = 0;
	avg = 0;
	total = 0;

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
		return this._set(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct);
	}
}
