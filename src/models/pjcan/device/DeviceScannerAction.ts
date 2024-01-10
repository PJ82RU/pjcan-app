import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IDeviceScannerAction } from "./IDeviceScannerAction";

export const API_DEVICE_SCANNER_CONFIG_EXEC = 0x07;
export const API_DEVICE_SCANNER_CONFIG_EVENT = "DeviceScannerAction";

export class DeviceScannerAction extends BaseModel implements IDeviceScannerAction
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		shutdown: BluetoothStruct.uint8()
	};
	static size: number = 2;

	enabled = false;
	shutdown = 5;

	constructor(data?: DataView)
	{
		super(API_DEVICE_SCANNER_CONFIG_EXEC, true);
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
		return this._get(this, this.exec, DeviceScannerAction.size, new BluetoothStruct(DeviceScannerAction.struct));
	}
}
