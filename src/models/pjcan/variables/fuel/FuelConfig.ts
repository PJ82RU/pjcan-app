import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_FUEL_CONFIG_SIZE, StructFuelConfig } from "./StructFuelConfig";
import { IFuelConfig } from "./IFuelConfig";

export const API_VARIABLE_FUEL_CONFIG_EXEC = 151;

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
		return this._set(this, API_VARIABLE_FUEL_CONFIG_EXEC, API_VARIABLE_FUEL_CONFIG_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_FUEL_CONFIG_EXEC, API_VARIABLE_FUEL_CONFIG_SIZE + 1, struct);
	}
}
