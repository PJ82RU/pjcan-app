import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructCarConfig } from "./StructCarConfig";
import { ICarConfig } from "./ICarConfig";

export const API_CAR_CONFIG_EXEC = 50;
export const API_SIZE_CAR_CONFIG = 48;

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
		return this._set(this, API_CAR_CONFIG_EXEC, API_SIZE_CAR_CONFIG + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_CAR_CONFIG_EXEC, API_SIZE_CAR_CONFIG + 1, struct);
	}
}
