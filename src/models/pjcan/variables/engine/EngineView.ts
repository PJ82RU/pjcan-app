import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_ENGINE_VIEW_SIZE, StructEngineView } from "./StructEngineView";
import { IEngineView } from "./IEngineView";

export const API_VARIABLE_ENGINE_VIEW_EXEC = 142;
export const API_VARIABLE_ENGINE_VIEW_EVENT = "VariableEngineView";

const struct = new BluetoothStruct(StructEngineView);

/** Модель параметров отображения данных ДВС */
export class EngineView extends BaseModel implements IEngineView
{
	enabled = new ViewConfig();
	totalSeconds = new ViewConfig();
	totalCountRPM = new ViewConfig();
	coolant = new ViewConfig();
	rpm = new ViewConfig();
	load = new ViewConfig();
	throttle = new ViewConfig();

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
		return this._set(this, API_VARIABLE_ENGINE_VIEW_EXEC, API_VARIABLE_ENGINE_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_ENGINE_VIEW_EXEC, API_VARIABLE_ENGINE_VIEW_SIZE + 1, struct);
	}
}
