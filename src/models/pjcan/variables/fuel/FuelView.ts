import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_FUEL_VIEW_SIZE, StructFuelView } from "./StructFuelView";
import { IFuelView } from "./IFuelView";

export const API_VARIABLE_FUEL_VIEW_EXEC = 152;
export const API_VARIABLE_FUEL_VIEW_EVENT = "VariableFuelView";

const struct = new BluetoothStruct(StructFuelView);

/** Модель параметров отображения данных расхода топлива */
export class FuelView extends BaseModel implements IFuelView
{
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
		return this._set(this, API_VARIABLE_FUEL_VIEW_EXEC, API_VARIABLE_FUEL_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_FUEL_VIEW_EXEC, API_VARIABLE_FUEL_VIEW_SIZE + 1, struct);
	}
}
