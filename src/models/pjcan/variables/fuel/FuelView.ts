import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IFuelView } from "./IFuelView";

export const API_VARIABLE_FUEL_VIEW_EXEC = 152;
export const API_VARIABLE_FUEL_VIEW_EVENT = "VariableFuelView";

/** Модель параметров отображения данных расхода топлива */
export class FuelView extends BaseModel implements IFuelView
{
	static struct: any = {
		consumption: BluetoothStruct.struct(ViewConfig.struct),
		current: BluetoothStruct.struct(ViewConfig.struct),
		avg: BluetoothStruct.struct(ViewConfig.struct),
		total: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 4;

	consumption = new ViewConfig();
	current = new ViewConfig();
	avg = new ViewConfig();
	total = new ViewConfig();

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
			API_VARIABLE_FUEL_VIEW_EXEC,
			FuelView.size + 1,
			new BluetoothStruct(FuelView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_FUEL_VIEW_EXEC, FuelView.size + 1, new BluetoothStruct(FuelView.struct));
	}
}
