import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITemperatureValue } from "./ITemperatureValue";
import { IVersion } from "../version";

export const API_TEMPERATURE_VALUE_EXEC = 0xd1;
export const API_TEMPERATURE_VALUE_EVENT = "TemperatureValue";

export const API_TEMPERATURE_VIEW_EXEC = 0xd3;
export const API_TEMPERATURE_VIEW_EVENT = "TemperatureView";

/** Модель значений температуры */
export class TemperatureValue extends BaseModel implements ITemperatureValue
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (version?.major === 4 && ((version.minor === 1 && version.build >= 2) || version.minor > 1))
		{
			TemperatureValue.struct = {
				isIn: BluetoothStruct.bit(),
				isOut: BluetoothStruct.bit(),
				in: BluetoothStruct.int8(),
				out: BluetoothStruct.int8()
			};
			TemperatureValue.size = 3;
		}
		else
		{
			TemperatureValue.struct = {
				in: BluetoothStruct.int16(),
				out: BluetoothStruct.int16()
			};
			TemperatureValue.size = 4;
		}
	}

	isIn = false;
	isOut = false;
	in = 0;
	out = 0;

	constructor(data?: DataView)
	{
		super(API_TEMPERATURE_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		const result: boolean = this._set(this, this.exec, TemperatureValue.size, new BluetoothStruct(TemperatureValue.struct), buf);
		if (result && TemperatureValue.size === 4)
		{
			this.isOut = true;
			this.out /= 10;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}

TemperatureValue.update();
