import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IClimateValue } from "./IClimateValue";

export const API_CLIMATE_VALUE_EXEC = 0x71;
export const API_CLIMATE_VALUE_EVENT = "ClimateValue";

export const API_CLIMATE_VIEW_EXEC = 0x73;
export const API_CLIMATE_VIEW_EVENT = "ClimateView";

/** Модель значений климата */
export class ClimateValue extends BaseModel implements IClimateValue
{
	static struct: any = {
		on: BluetoothStruct.bit(),
		automode: BluetoothStruct.bit(),
		ac: BluetoothStruct.bit(),
		eco: BluetoothStruct.bit(),
		airDLegs: BluetoothStruct.bit(),
		airDBody: BluetoothStruct.bit(),
		airDWindshield: BluetoothStruct.bit(),
		dBackWin: BluetoothStruct.bit(),
		airInside: BluetoothStruct.bit(),
		airOutside: BluetoothStruct.bit(),
		temperatureSettable: BluetoothStruct.bit(),
		temperatureAmb: BluetoothStruct.bit(),
		temperatureCelsius: BluetoothStruct.bit(),
		temperatureFahrenheit: BluetoothStruct.bit(),
		airRate: BluetoothStruct.uint8(),
		temperature: BluetoothStruct.uint16()
	};
	static size: number = 5;

	on = false;
	automode = false;
	ac = false;
	eco = false;
	airDLegs = false;
	airDBody = false;
	airDWindshield = false;
	dBackWin = false;
	airInside = false;
	airOutside = false;
	temperatureSettable = false;
	temperatureAmb = false;
	temperatureCelsius = false;
	temperatureFahrenheit = false;
	airRate = 0;
	temperature = 0;

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
			API_CLIMATE_VALUE_EXEC,
			ClimateValue.size,
			new BluetoothStruct(ClimateValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_CLIMATE_VALUE_EXEC);
	}
}
