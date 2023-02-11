import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructDeviceValue } from "./StructDeviceValue";
import { IDeviceValue } from "./IDeviceValue";

export const API_EXEC_DEVICE_VALUE = 11;
export const API_SIZE_DEVICE_VALUE = 10;

const struct = new BluetoothStruct(StructDeviceValue);

/** Модель значений устройства */
export class DeviceValue extends BaseModel implements IDeviceValue
{
	reboot = false;
	resetConfig = false;
	resetView = false;
	led = 0;
	activation = false;
	save = false;
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
		return this._set(this, API_EXEC_DEVICE_VALUE, API_SIZE_DEVICE_VALUE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_DEVICE_VALUE, API_SIZE_DEVICE_VALUE + 1, struct);
	}
}
