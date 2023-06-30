import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ITemperatureValue } from "./ITemperatureValue";

export const API_VARIABLE_TEMPERATURE_EXEC = 180;
export const API_VARIABLE_TEMPERATURE_EVENT = "VariableTemperatureValue";

/** Модель значений температуры */
export class TemperatureValue extends BaseModel implements ITemperatureValue
{
	static struct: any = {
		in: BluetoothStruct.uint16(),
		out: BluetoothStruct.uint16()
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
			API_VARIABLE_TEMPERATURE_EXEC,
			TemperatureValue.size + 1,
			new BluetoothStruct(TemperatureValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_TEMPERATURE_EXEC,
			TemperatureValue.size + 1,
			new BluetoothStruct(TemperatureValue.struct)
		);
	}
}
