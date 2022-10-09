import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base/BaseModel";
import { StructDeviceConfig } from "./StructDeviceConfig";
import { IDeviceConfig } from "./IDeviceConfig";

export const API_EXEC_DEVICE_CONFIG = 10; // команда API
const STRUCT_LENGTH = 3; // длина данных API

const struct = new BluetoothStruct(StructDeviceConfig);

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig
{
	reboot = false;
	led = 0;

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
		return this._set(this, API_EXEC_DEVICE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_DEVICE_CONFIG, STRUCT_LENGTH, struct);
	}
}
