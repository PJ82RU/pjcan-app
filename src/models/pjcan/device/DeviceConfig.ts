import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_DEVICE_CONFIG_SIZE, StructDeviceConfig } from "./StructDeviceConfig";
import { IDeviceConfig } from "./IDeviceConfig";

export const API_DEVICE_CONFIG_EXEC = 10;
export const API_DEVICE_CONFIG_EVENT = "DeviceConfig";

const struct = new BluetoothStruct(StructDeviceConfig);

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig
{
	serial = "";

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
		return this._set(this, API_DEVICE_CONFIG_EXEC, API_DEVICE_CONFIG_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_DEVICE_CONFIG_EXEC, API_DEVICE_CONFIG_SIZE + 1, struct);
	}
}
