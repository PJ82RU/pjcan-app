import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructDeviceValue } from "./StructDeviceValue";
import { IDeviceValue } from "./IDeviceValue";

export const API_EXEC_DEVICE_VALUE = 11; // команда API
const STRUCT_LENGTH = 9; // длина данных API

const struct = new BluetoothStruct(StructDeviceValue);

/** Модель значений устройства */
export class DeviceValue extends BaseModel implements IDeviceValue
{
	worktime = BigInt(0);

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
		return this._set(this, API_EXEC_DEVICE_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_DEVICE_VALUE, STRUCT_LENGTH, struct);
	}
}
