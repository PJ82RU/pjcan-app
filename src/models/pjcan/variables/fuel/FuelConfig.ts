import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructFuelConfig } from "./StructFuelConfig";
import { IFuelConfig } from "./IFuelConfig";

export const API_EXEC_VARIABLE_FUEL_CONFIG = 151;
export const API_SIZE_VARIABLE_FUEL_CONFIG = 2;

const struct = new BluetoothStruct(StructFuelConfig);

/** Модель конфигурации расхода топлива */
export class FuelConfig extends BaseModel implements IFuelConfig
{
	ratio = 0;

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
		return this._set(this, API_EXEC_VARIABLE_FUEL_CONFIG, API_SIZE_VARIABLE_FUEL_CONFIG + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_FUEL_CONFIG, API_SIZE_VARIABLE_FUEL_CONFIG + 1, struct);
	}
}
