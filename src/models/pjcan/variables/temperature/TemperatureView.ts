import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_TEMPERATURE_VIEW_SIZE, StructTemperatureView } from "./StructTemperatureView";
import { ITemperatureView } from "./ITemperatureView";

export const API_VARIABLE_TEMPERATURE_VIEW_EXEC = 181;

const struct = new BluetoothStruct(StructTemperatureView);

/** Модель параметров отображения данных температуры */
export class TemperatureView extends BaseModel implements ITemperatureView
{
	view = new ViewConfig();

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
		return this._set(this, API_VARIABLE_TEMPERATURE_VIEW_EXEC, API_VARIABLE_TEMPERATURE_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_TEMPERATURE_VIEW_EXEC, API_VARIABLE_TEMPERATURE_VIEW_SIZE + 1, struct);
	}
}
