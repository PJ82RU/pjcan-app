import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IClimateValue } from "./IClimateValue";

export const API_VARIABLE_CLIMATE_EXEC = 120;
export const API_VARIABLE_CLIMATE_EVENT = "VariableClimateValue";

/** Модель значений климата */
export class ClimateValue extends BaseModel implements IClimateValue
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		automode: BluetoothStruct.bit(),
		ac: BluetoothStruct.bit(),
		airDLegs: BluetoothStruct.bit(),
		airDBody: BluetoothStruct.bit(),
		airDWindshield: BluetoothStruct.bit(),
		airDBackWin: BluetoothStruct.bit(),
		eco: BluetoothStruct.bit(),
		airRate: BluetoothStruct.uint8(),
		airType: BluetoothStruct.uint8(),
		tempType: BluetoothStruct.uint8(),
		tempDisplay: BluetoothStruct.uint8(),
		temperature: BluetoothStruct.uint16()
	};
	static size: number = 7;

	enabled = false;
	automode = false;
	ac = false;
	airDLegs = false;
	airDBody = false;
	airDWindshield = false;
	airDBackWin = false;
	eco = false;
	airRate = 0;
	airType = 0;
	tempType = 0;
	tempDisplay = 0;
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
			API_VARIABLE_CLIMATE_EXEC,
			ClimateValue.size + 1,
			new BluetoothStruct(ClimateValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_CLIMATE_EXEC,
			ClimateValue.size + 1,
			new BluetoothStruct(ClimateValue.struct)
		);
	}
}
