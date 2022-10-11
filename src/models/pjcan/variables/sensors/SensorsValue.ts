import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ISensorsValue, StructSensorsValue, TSensorsSignal } from "./index";

export const API_EXEC_VARIABLE_SENSORS = 170; // команда API
const STRUCT_LENGTH = 3; // длина данных API

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
		return this._set(this, API_EXEC_VARIABLE_SENSORS, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_SENSORS, STRUCT_LENGTH, struct);
	}
}
