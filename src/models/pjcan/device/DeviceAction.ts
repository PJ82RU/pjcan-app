import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceAction } from "./IDeviceAction";

export const API_DEVICE_ACTION_EXEC = 0x04;
export const API_DEVICE_ACTION_EVENT = "DeviceAction";

/** Модель действий устройства */
export class DeviceAction extends BaseModel implements IDeviceAction
{
	static struct: any = {
		reboot: BluetoothStruct.bit(),
		resetConfig: BluetoothStruct.bit(),
		resetView: BluetoothStruct.bit(),
		save: BluetoothStruct.bit(),
		format: BluetoothStruct.bit()
	};
	static size: number = 1;

	reboot = false;
	resetConfig = false;
	resetView = false;
	save = false;
	format = false;

	constructor()
	{
		super(API_DEVICE_ACTION_EXEC);
		this.skipActivationCheck = true;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return false;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec, DeviceAction.size, new BluetoothStruct(DeviceAction.struct));
	}
}
