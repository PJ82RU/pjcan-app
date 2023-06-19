import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_DOORS_SIZE, StructDoorsValue } from "./StructDoorsValue";
import { IDoorsValue } from "./IDoorsValue";

export const API_VARIABLE_DOORS_EXEC = 130;
export const API_VARIABLE_DOORS_EVENT = "VariableDoorsValue";

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_DOORS_EXEC, API_VARIABLE_DOORS_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_DOORS_EXEC, API_VARIABLE_DOORS_SIZE + 1, struct);
	}
}
