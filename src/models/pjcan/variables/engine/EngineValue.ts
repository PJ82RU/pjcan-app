import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IEngineValue } from "./IEngineValue";
import { IVersion } from "@/models/pjcan/version";

export const API_VARIABLE_ENGINE_EXEC = 140;
export const API_VARIABLE_ENGINE_EVENT = "VariableEngineValue";

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (!version || version.compareString("4.0.2") !== 1)
		{
			EngineValue.struct = {
				enabled: BluetoothStruct.bit(),
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
			EngineValue.size = 25;
		}
		else
		{
			EngineValue.struct = {
				enabled: BluetoothStruct.bit(),
				coolant: BluetoothStruct.int8(),
				rpm: BluetoothStruct.uint16(),
				mseconds: BluetoothStruct.uint32(),
				totalSeconds: BluetoothStruct.uint32(),
				totalCountRPM: BluetoothStruct.uint32(),
				countRPM: BluetoothStruct.uint32(),
				load: BluetoothStruct.uint16(),
				throttle: BluetoothStruct.uint16()
			};
			EngineValue.size = 24;
		}
	}

	enabled = false;
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
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_ENGINE_EXEC,
			EngineValue.size + 1,
			new BluetoothStruct(EngineValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_ENGINE_EXEC, EngineValue.size + 1, new BluetoothStruct(EngineValue.struct));
	}
}
