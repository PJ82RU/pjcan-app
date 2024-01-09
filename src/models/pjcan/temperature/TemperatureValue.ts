import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITemperatureValue } from "./ITemperatureValue";

export const API_TEMPERATURE_VALUE_EXEC = 0xd1;
export const API_TEMPERATURE_VALUE_EVENT = "TemperatureValue";

export const API_TEMPERATURE_VIEW_EXEC = 0xd3;
export const API_TEMPERATURE_VIEW_EVENT = "TemperatureView";

/** Модель значений температуры */
export class TemperatureValue extends BaseModel implements ITemperatureValue
{
	static struct: any = {
		in: BluetoothStruct.int16(),
		out: BluetoothStruct.int16()
	};
	static size: number = 4;

	in = 0;
	out = 0;

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
			API_TEMPERATURE_VALUE_EXEC,
			TemperatureValue.size,
			new BluetoothStruct(TemperatureValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_TEMPERATURE_VALUE_EXEC);
	}
}
