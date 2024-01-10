import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ViewConfig } from "../view";
import { IFuelViews } from "./IFuelViews";

export const API_FUEL_VIEW_EXEC = 0xa3;
export const API_FUEL_VIEW_EVENT = "FuelView";

export const API_FUEL_VIEW_CURRENT_EXEC = 0xa4;
export const API_FUEL_VIEW_CURRENT_EVENT = "FuelViewCurrent";

export const API_FUEL_VIEW_AVG_EXEC = 0xa5;
export const API_FUEL_VIEW_AVG_EVENT = "FuelViewAVG";

/** Модель параметров отображения данных расхода топлива */
export class FuelViews extends BaseModel implements IFuelViews
{
	static struct: any = {
		current: BluetoothStruct.struct(ViewConfig.struct),
		avg: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = 8;

	current = new ViewConfig(API_FUEL_VIEW_CURRENT_EXEC);
	avg = new ViewConfig(API_FUEL_VIEW_AVG_EXEC);

	constructor(data?: DataView)
	{
		super(API_FUEL_VIEW_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, FuelViews.size, new BluetoothStruct(FuelViews.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
