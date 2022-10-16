import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { StructClimateView } from "./StructClimateView";
import { IClimateView } from "./IClimateView";

export const API_EXEC_VARIABLE_CLIMATE_VIEW = 121; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructClimateView);

/** Модель параметров отображения данных климата */
export class ClimateView extends BaseModel implements IClimateView
{
	climate = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct);
	}
}
