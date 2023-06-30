import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ISensorsValue } from "./ISensorsValue";
import { TSensorsSignal } from "./TSensorsSignal";

export const API_VARIABLE_SENSORS_EXEC = 170;
export const API_VARIABLE_SENSORS_EVENT = "VariableSensorsValue";

/** Модель значений датчиков */
export class SensorsValue extends BaseModel implements ISensorsValue
{
	static struct: any = {
		acc: BluetoothStruct.bit(),
		handbrake: BluetoothStruct.bit(),
		reverse: BluetoothStruct.bit(),
		seatbeltDriver: BluetoothStruct.bit(),
		seatbeltPassenger: BluetoothStruct.bit(),
		signal: BluetoothStruct.uint8()
	};
	static size: number = 2;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_SENSORS_EXEC,
			SensorsValue.size + 1,
			new BluetoothStruct(SensorsValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_SENSORS_EXEC,
			SensorsValue.size + 1,
			new BluetoothStruct(SensorsValue.struct)
		);
	}
}
