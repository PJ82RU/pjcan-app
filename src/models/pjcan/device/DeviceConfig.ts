import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceConfig } from "./IDeviceConfig";

export const API_DEVICE_CONFIG_EXEC = 0x02;
export const API_DEVICE_CONFIG_EVENT = "DeviceConfig";

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig
{
	static struct: any = {
		serial: BluetoothStruct.char(64)
	};
	static size: number = 64;

	serial = "";

	constructor(data?: DataView)
	{
		super(API_DEVICE_CONFIG_EXEC);
		this.skipActivationCheck = true;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DeviceConfig.size, new BluetoothStruct(DeviceConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, DeviceConfig.size, new BluetoothStruct(DeviceConfig.struct));
	}
}
