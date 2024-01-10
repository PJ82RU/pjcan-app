import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IFuelConfig } from "./IFuelConfig";

export const API_FUEL_CONFIG_EXEC = 0xa0;
export const API_FUEL_CONFIG_EVENT = "FuelConfig";

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
		super(API_FUEL_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, FuelConfig.size, new BluetoothStruct(FuelConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, FuelConfig.size, new BluetoothStruct(FuelConfig.struct));
	}
}
