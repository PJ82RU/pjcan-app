import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructSensorsValue } from "./StructSensorsValue";
import { ISensorsValue } from "./ISensorsValue";
import { TSensorsSignal } from "./TSensorsSignal";

export const API_EXEC_VARIABLE_SENSORS = 170;
export const API_SIZE_VARIABLE_SENSORS = 2;

const struct = new BluetoothStruct(StructSensorsValue);

/** Модель значений датчиков */
export class SensorsValue extends BaseModel implements ISensorsValue
{
	acc = false;
	handbrake = false;
	reverse = false;
	seatbeltDriver = false;
	seatbeltPassenger = false;
	signal = TSensorsSignal.SIGNAL_NONE;

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
		return this._set(this, API_EXEC_VARIABLE_SENSORS, API_SIZE_VARIABLE_SENSORS + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_SENSORS, API_SIZE_VARIABLE_SENSORS + 1, struct);
	}
}
