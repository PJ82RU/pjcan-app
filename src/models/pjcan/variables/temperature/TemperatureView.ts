import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { ITemperatureView, StructTemperatureView } from "./index";

export const API_EXEC_VARIABLE_TEMPERATURE_VIEW = 181; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructTemperatureView);

/** Модель параметров отображения данных температуры */
export class TemperatureView extends BaseModel implements ITemperatureView
{
	temperature = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct);
	}
}
