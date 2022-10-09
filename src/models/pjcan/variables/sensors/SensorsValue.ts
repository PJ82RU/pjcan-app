import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_SENSORS = 170; // команда API
const STRUCT_LENGTH = 3; // длина данных API

export enum TSensorsSignal {
	SIGNAL_NONE = 0,
	SIGNAL_LEFT = 1,
	SIGNAL_RIGHT = 2,
	SIGNAL_EMERGENCY = 3
}

/** Интерфейс значений датчиков */
export interface ISensorsValue extends IBaseModel {
	acc: boolean;
	handbrake: boolean;
	reverse: boolean;
	seatbeltDriver: boolean;
	seatbeltPassenger: boolean;
	signal: TSensorsSignal;
}

/** Структура данных */
export const StructSensorsValue = {
	acc: BluetoothStruct.bit(),
	handbrake: BluetoothStruct.bit(),
	reverse: BluetoothStruct.bit(),
	seatbeltDriver: BluetoothStruct.bit(),
	seatbeltPassenger: BluetoothStruct.bit(),
	signal: BluetoothStruct.uint8()
};

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
