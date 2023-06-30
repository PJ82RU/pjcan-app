import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IFuelConfig } from "./IFuelConfig";

export const API_VARIABLE_FUEL_CONFIG_EXEC = 151;
export const API_VARIABLE_FUEL_CONFIG_EVENT = "VariableFuelConfig";

/** Модель конфигурации расхода топлива */
export class FuelConfig extends BaseModel implements IFuelConfig
{
	static struct: any = {
		ratio: BluetoothStruct.uint16()
	};
	static size: number = 2;

	ratio = 0;

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
		return this._set(
			this,
			API_VARIABLE_FUEL_CONFIG_EXEC,
			FuelConfig.size + 1,
			new BluetoothStruct(FuelConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_FUEL_CONFIG_EXEC,
			FuelConfig.size + 1,
			new BluetoothStruct(FuelConfig.struct)
		);
	}
}
