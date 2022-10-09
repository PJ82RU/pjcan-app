import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_TEMPERATURE = 180; // команда API
const STRUCT_LENGTH = 9; // длина данных API

/** Интерфейс значений температуры */
export interface ITemperatureValue extends IBaseModel {
	in: number;
	out: number;
}

/** Структура данных */
export const StructTemperatureValue = {
	in: BluetoothStruct.float32(),
	out: BluetoothStruct.float32()
};

const struct = new BluetoothStruct(StructTemperatureValue);

/** Модель значений температуры */
export class TemperatureValue extends BaseModel implements ITemperatureValue
{
	in = 0;
	out = 0;

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
		return this._set(this, API_EXEC_VARIABLE_TEMPERATURE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_TEMPERATURE, STRUCT_LENGTH, struct);
	}
}
