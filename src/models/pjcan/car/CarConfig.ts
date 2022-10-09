import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base/BaseModel";
import { StructCarConfig } from "./StructCarConfig";
import { ICarConfig } from "./ICarConfig";

export const API_EXEC_CAR_CONFIG = 50; // команда API
const STRUCT_LENGTH = 49; // длина данных API

const struct = new BluetoothStruct(StructCarConfig);

/** Модель параметров автомобиля */
export class CarConfig extends BaseModel implements ICarConfig
{
	lcd = false;
	carModel = 0;
	logo = "";
	hello = "";

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
		return this._set(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct);
	}
}
