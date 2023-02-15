import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructFuelValue } from "./StructFuelValue";
import { IFuelValue } from "./IFuelValue";

export const API_EXEC_VARIABLE_FUEL = 150;
export const API_SIZE_VARIABLE_FUEL = 12;

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
		return this._set(this, API_EXEC_VARIABLE_FUEL, API_SIZE_VARIABLE_FUEL + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_FUEL, API_SIZE_VARIABLE_FUEL + 1, struct);
	}
}
