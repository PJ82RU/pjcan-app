import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_CLIMATE_VIEW_SIZE, StructClimateView } from "./StructClimateView";
import { IClimateView } from "./IClimateView";

export const API_VARIABLE_CLIMATE_VIEW_EXEC = 121;
export const API_VARIABLE_CLIMATE_VIEW_EVENT = "VariableClimateView";

const struct = new BluetoothStruct(StructClimateView);

/** Модель параметров отображения данных климата */
export class ClimateView extends BaseModel implements IClimateView
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
		return this._set(this, API_VARIABLE_CLIMATE_VIEW_EXEC, API_VARIABLE_CLIMATE_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_CLIMATE_VIEW_EXEC, API_VARIABLE_CLIMATE_VIEW_SIZE + 1, struct);
	}
}
