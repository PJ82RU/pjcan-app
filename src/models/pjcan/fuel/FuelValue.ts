import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IFuelValue } from "./IFuelValue";

export const API_FUEL_VALUE_EXEC = 0xa1;
export const API_FUEL_VALUE_EVENT = "FuelValue";

/** Модель значений расхода топлива */
export class FuelValue extends BaseModel implements IFuelValue
{
	static struct: any = {
		current: BluetoothStruct.uint16(),
		avg: BluetoothStruct.uint16()
	};
	static size: number = 4;

	current = 0;
	avg = 0;

	constructor(data?: DataView)
	{
		super(API_FUEL_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, FuelValue.size, new BluetoothStruct(FuelValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
