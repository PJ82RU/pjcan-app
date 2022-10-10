import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IDoorsValue, StructDoorsValue } from "./index";

export const API_EXEC_VARIABLE_DOORS = 130; // команда API
const STRUCT_LENGTH = 2; // длина данных API

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
