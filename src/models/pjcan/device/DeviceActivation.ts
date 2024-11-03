import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceActivation } from "./IDeviceActivation";

export const API_DEVICE_ACTIVATION_EXEC = 0x02;
export const API_DEVICE_ACTIVATION_EVENT = "DeviceActivation";

/** Модель активации устройства */
export class DeviceActivation extends BaseModel implements IDeviceActivation
{
	static struct: any = {
		serial: BluetoothStruct.char(64)
	};
	static size: number = 64;

	serial = "";

	constructor(data?: DataView)
	{
		super(API_DEVICE_ACTIVATION_EXEC);
		this.skipActivationCheck = true;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DeviceActivation.size, new BluetoothStruct(DeviceActivation.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, DeviceActivation.size, new BluetoothStruct(DeviceActivation.struct));
	}
}
