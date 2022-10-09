// noinspection SpellCheckingInspection

import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_CLIMATE = 120; // команда API
const STRUCT_LENGTH = 10; // длина данных API

export enum TAir {
	AIR_NONE,
	AIR_CABIN,
	AIR_STREET
}

/** Интерфейс значений климата */
export interface IClimateValue extends IBaseModel {
	enabled: boolean;
	automode: boolean;
	ac: boolean;
	airDLegs: boolean;
	airDBody: boolean;
	airDWindshield: boolean;
	visible: boolean;
	airRate: number;
	airType: TAir;
	tempType: number;
	tempDisplay: number;
	temperature: number;
}

/** Структура данных */
export const StructClimateValue = {
	enabled: BluetoothStruct.bit(),
	automode: BluetoothStruct.bit(),
	ac: BluetoothStruct.bit(),
	airDLegs: BluetoothStruct.bit(),
	airDBody: BluetoothStruct.bit(),
	airDWindshield: BluetoothStruct.bit(),
	visible: BluetoothStruct.bit(),
	airRate: BluetoothStruct.uint8(),
	airType: BluetoothStruct.uint8(),
	tempType: BluetoothStruct.uint8(),
	tempDisplay: BluetoothStruct.uint8(),
	temperature: BluetoothStruct.float32()
};

const struct = new BluetoothStruct(StructClimateValue);

/** Модель значений климата */
export class ClimateValue extends BaseModel implements IClimateValue
{
	enabled = false;
	automode = false;
	ac = false;
	airDLegs = false;
	airDBody = false;
	airDWindshield = false;
	visible = false;
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_CLIMATE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_CLIMATE, STRUCT_LENGTH, struct);
	}
}
