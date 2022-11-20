import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VIEW, ViewConfig } from "../../view";
import { StructFuelView } from "./StructFuelView";
import { IFuelView } from "./IFuelView";

export const API_EXEC_VARIABLE_FUEL_VIEW = 152;
export const API_SIZE_VARIABLE_FUEL_VIEW = API_SIZE_VIEW * 4;

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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_FUEL_VIEW, API_SIZE_VARIABLE_FUEL_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_FUEL_VIEW, API_SIZE_VARIABLE_FUEL_VIEW + 1, struct);
	}
}
