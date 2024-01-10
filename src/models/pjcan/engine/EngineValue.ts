import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineValue } from "./IEngineValue";

export const API_ENGINE_VALUE_EXEC = 0x91;
export const API_ENGINE_VALUE_EVENT = "EngineValue";

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue
{
	static struct: any = {
		on: BluetoothStruct.bit(),
		coolant: BluetoothStruct.int8(),
		rpm: BluetoothStruct.uint16(),
		worktime: BluetoothStruct.uint32(),
		countRPM: BluetoothStruct.uint32(),
		load: BluetoothStruct.uint16(),
		throttle: BluetoothStruct.uint16(),
		viewDays: BluetoothStruct.uint16(),
		viewHours: BluetoothStruct.uint8(),
		viewMinutes: BluetoothStruct.uint8(),
		viewSeconds: BluetoothStruct.uint8(),
		viewCountRPM: BluetoothStruct.uint32()
	};
	static size: number = 25;

	on = false;
	coolant = 0;
	rpm = 0;
	worktime = 0;
	countRPM = 0;
	load = 0;
	throttle = 0;
	viewDays = 0;
	viewHours = 0;
	viewMinutes = 0;
	viewSeconds = 0;
	viewCountRPM = 0;

	constructor(data?: DataView)
	{
		super(API_ENGINE_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, EngineValue.size, new BluetoothStruct(EngineValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
