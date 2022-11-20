import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VIEW, ViewConfig } from "../../view";
import { StructSensorsView } from "./StructSensorsView";
import { ISensorsView } from "./ISensorsView";

export const API_EXEC_VARIABLE_SENSORS_VIEW = 171;
export const API_SIZE_VARIABLE_SENSORS_VIEW = API_SIZE_VIEW * 4;

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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_SENSORS_VIEW, API_SIZE_VARIABLE_SENSORS_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_SENSORS_VIEW, API_SIZE_VARIABLE_SENSORS_VIEW + 1, struct);
	}
}
