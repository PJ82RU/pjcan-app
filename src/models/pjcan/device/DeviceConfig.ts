import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceConfig } from "./IDeviceConfig";

export const API_DEVICE_CONFIG_EXEC = 10;
export const API_DEVICE_CONFIG_EVENT = "DeviceConfig";
export const API_DEVICE_SERIAL_SIZE = 64;

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig
{
	static struct: any = {
		serial: BluetoothStruct.char(API_DEVICE_SERIAL_SIZE)
	};
	static size: number = API_DEVICE_SERIAL_SIZE;

	serial = "";

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
			API_DEVICE_CONFIG_EXEC,
			DeviceConfig.size + 1,
			new BluetoothStruct(DeviceConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_DEVICE_CONFIG_EXEC, DeviceConfig.size + 1, new BluetoothStruct(DeviceConfig.struct));
	}
}
