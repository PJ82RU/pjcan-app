import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ISensorsValue } from "./ISensorsValue";

export const API_SENSORS_VALUE_EXEC = 0xc1;
export const API_SENSORS_VALUE_EVENT = "SensorsValue";

/** Модель значений датчиков */
export class SensorsValue extends BaseModel implements ISensorsValue
{
	static struct: any = {
		acc: BluetoothStruct.bit(),
		handbrake: BluetoothStruct.bit(),
		reverse: BluetoothStruct.bit(),
		seatbeltDriver: BluetoothStruct.bit(),
		seatbeltPassenger: BluetoothStruct.bit(),
		turnSignalLeft: BluetoothStruct.bit(),
		turnSignalRight: BluetoothStruct.bit(),
		highBeam: BluetoothStruct.bit()
	};
	static size: number = 1;

	acc = false;
	handbrake = false;
	reverse = false;
	seatbeltDriver = false;
	seatbeltPassenger = false;
	turnSignalLeft = false;
	turnSignalRight = false;
	highBeam = false;

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
			API_SENSORS_VALUE_EXEC,
			SensorsValue.size,
			new BluetoothStruct(SensorsValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_SENSORS_VALUE_EXEC);
	}
}
