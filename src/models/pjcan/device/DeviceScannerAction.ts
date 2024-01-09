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

	requestPriority = true;

	constructor(data?: DataView)
	{
		super();
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
		return this._get(
			this,
			API_DEVICE_SCANNER_CONFIG_EXEC,
			DeviceScannerAction.size,
			new BluetoothStruct(DeviceScannerAction.struct)
		);
	}
}
