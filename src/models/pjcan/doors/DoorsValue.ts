import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDoorsValue } from "./IDoorsValue";

export const API_DOORS_VALUE_EXEC = 0x81;
export const API_DOORS_VALUE_EVENT = "DoorsValue";

export const API_DOORS_VIEW_EXEC = 0x83;
export const API_DOORS_VIEW_EVENT = "DoorsView";

/** Модель значений дверей */
export class DoorsValue extends BaseModel implements IDoorsValue
{
	static struct: any = {
		frontLeft: BluetoothStruct.bit(),
		frontRight: BluetoothStruct.bit(),
		backLeft: BluetoothStruct.bit(),
		backRight: BluetoothStruct.bit(),
		trunk: BluetoothStruct.bit(),
		bonnet: BluetoothStruct.bit()
	};
	static size: number = 1;

	frontLeft = false;
	frontRight = false;
	backLeft = false;
	backRight = false;
	trunk = false;
	bonnet = false;

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
			API_DOORS_VALUE_EXEC,
			DoorsValue.size,
			new BluetoothStruct(DoorsValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_DOORS_VALUE_EXEC);
	}
}
