import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceValue } from "./IDeviceValue";

export const API_DEVICE_VALUE_EXEC = 11;
export const API_DEVICE_EVENT = "DeviceValue";

/** Модель значений устройства */
export class DeviceValue extends BaseModel implements IDeviceValue
{
	static struct: any = {
		reboot: BluetoothStruct.bit(),
		resetConfig: BluetoothStruct.bit(),
		resetView: BluetoothStruct.bit(),
		activation: BluetoothStruct.bit(),
		save: BluetoothStruct.bit(),
		led: BluetoothStruct.uint8(),
		worktime: BluetoothStruct.uint64()
	};
	static size: number = 10;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_DEVICE_VALUE_EXEC,
			DeviceValue.size + 1,
			new BluetoothStruct(DeviceValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_DEVICE_VALUE_EXEC, DeviceValue.size + 1, new BluetoothStruct(DeviceValue.struct));
	}
}
