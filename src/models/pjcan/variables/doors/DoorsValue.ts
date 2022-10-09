import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_DOORS = 130; // команда API
const STRUCT_LENGTH = 2; // длина данных API

/** Интерфейс значений дверей */
export interface IDoorsValue extends IBaseModel {
	frontLeft: boolean;
	frontRight: boolean;
	backLeft: boolean;
	backRight: boolean;
	trunk: boolean;
}

/** Структура данных */
export const StructDoorsValue = {
	frontLeft: BluetoothStruct.bit(),
	frontRight: BluetoothStruct.bit(),
	backLeft: BluetoothStruct.bit(),
	backRight: BluetoothStruct.bit(),
	trunk: BluetoothStruct.bit()
};

const struct = new BluetoothStruct(StructDoorsValue);

/** Модель значений дверей */
export class DoorsValue extends BaseModel implements IDoorsValue
{
	frontLeft = false;
	frontRight = false;
	backLeft = false;
	backRight = false;
	trunk = false;

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
		return this._set(this, API_EXEC_VARIABLE_DOORS, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_DOORS, STRUCT_LENGTH, struct);
	}
}
