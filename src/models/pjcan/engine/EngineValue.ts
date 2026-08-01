import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineValue } from "./IEngineValue";
import { IVersion } from "@/models/pjcan/version";

export const API_ENGINE_VALUE_EXEC = 0x91;
export const API_ENGINE_VALUE_EVENT = "EngineValue";

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
		if (version && (version.major > 4 || (version.major === 4 && version.minor >= 2)))
		{
			EngineValue.struct = {
				on: BluetoothStruct.bit(),
				coolant: BluetoothStruct.int8(),
				rpm: BluetoothStruct.uint16(),
				worktime: BluetoothStruct.uint32(),
				countRPM: BluetoothStruct.uint32(),
				load: BluetoothStruct.uint16(),
				throttle: BluetoothStruct.uint16(),
				currentSpeed: BluetoothStruct.uint16(),
				averageSpeed: BluetoothStruct.uint16(),
				distanceMeters: BluetoothStruct.uint32(),
				distanceLeftKm: BluetoothStruct.uint16(),
				oilLifePercent: BluetoothStruct.uint8(),
				viewDays: BluetoothStruct.uint16(),
				viewHours: BluetoothStruct.uint8(),
				viewMinutes: BluetoothStruct.uint8(),
				viewSeconds: BluetoothStruct.uint8(),
				viewCountRPM: BluetoothStruct.uint32()
			};
			EngineValue.size = 36;
		}
		else
		{
			EngineValue.struct = {
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
			EngineValue.size = 25;
		}
	}

	on = false;
	coolant = 0;
	rpm = 0;
	worktime = 0;
	countRPM = 0;
	load = 0;
	throttle = 0;
	currentSpeed = 0;
	averageSpeed = 0;
	distanceMeters = 0;
	distanceLeftKm = 0;
	oilLifePercent = 0;
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
