import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IFuelValue } from "./IFuelValue";

export const API_VARIABLE_FUEL_EXEC = 150;
export const API_VARIABLE_FUEL_EVENT = "VariableFuelValue";

/** Модель значений расхода топлива */
export class FuelValue extends BaseModel implements IFuelValue
{
	static struct: any = {
		consumption: BluetoothStruct.uint32(),
		current: BluetoothStruct.uint16(),
		avg: BluetoothStruct.uint16(),
		total: BluetoothStruct.uint32()
	};
	static size: number = 12;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_FUEL_EXEC, FuelValue.size + 1, new BluetoothStruct(FuelValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_FUEL_EXEC, FuelValue.size + 1, new BluetoothStruct(FuelValue.struct));
	}
}
