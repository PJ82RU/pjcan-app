import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_SENSORS_VIEW_SIZE, StructSensorsView } from "./StructSensorsView";
import { ISensorsView } from "./ISensorsView";

export const API_VARIABLE_SENSORS_VIEW_EXEC = 171;
export const API_VARIABLE_SENSORS_VIEW_EVENT = "VariableSensorsView";

const struct = new BluetoothStruct(StructSensorsView);

/** Модель параметров отображения данных датчиков */
export class SensorsView extends BaseModel implements ISensorsView
{
	handbrake = new ViewConfig();
	reverse = new ViewConfig();
	seatbelt = new ViewConfig();
	signal = new ViewConfig();

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
		return this._set(this, API_VARIABLE_SENSORS_VIEW_EXEC, API_VARIABLE_SENSORS_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_SENSORS_VIEW_EXEC, API_VARIABLE_SENSORS_VIEW_SIZE + 1, struct);
	}
}
