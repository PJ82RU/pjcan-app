import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceValue } from "./IDeviceValue";

export const API_DEVICE_VALUE_EXEC = 0x03;
export const API_DEVICE_VALUE_EVENT = "DeviceValue";

/** Модель значений устройства */
export class DeviceValue extends BaseModel implements IDeviceValue
{
	static struct: any = {
		activation: BluetoothStruct.bit(),
		led: BluetoothStruct.uint8(),
		worktime: BluetoothStruct.uint32()
	};
	static size: number = 6;

	activation = false;
	led = 0;
	worktime = 0;

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
			API_DEVICE_VALUE_EXEC,
			DeviceValue.size,
			new BluetoothStruct(DeviceValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_DEVICE_VALUE_EXEC, DeviceValue.size, new BluetoothStruct(DeviceValue.struct));
	}
}
