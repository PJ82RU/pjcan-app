import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IDoorsValue } from "./IDoorsValue";

export const API_VARIABLE_DOORS_EXEC = 130;
export const API_VARIABLE_DOORS_EVENT = "VariableDoorsValue";

/** Модель значений дверей */
export class DoorsValue extends BaseModel implements IDoorsValue
{
	static struct: any = {
		frontLeft: BluetoothStruct.bit(),
		frontRight: BluetoothStruct.bit(),
		backLeft: BluetoothStruct.bit(),
		backRight: BluetoothStruct.bit(),
		trunk: BluetoothStruct.bit()
	};
	static size: number = 1;

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
		return this._set(
			this,
			API_VARIABLE_DOORS_EXEC,
			DoorsValue.size + 1,
			new BluetoothStruct(DoorsValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_DOORS_EXEC, DoorsValue.size + 1, new BluetoothStruct(DoorsValue.struct));
	}
}
