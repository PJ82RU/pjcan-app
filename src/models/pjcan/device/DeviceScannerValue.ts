import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IDeviceScannerValue } from "./IDeviceScannerValue";
import { IDeviceScannerFrame } from "./IDeviceScannerFrame";

export const API_DEVICE_SCANNER_VALUE_EXEC = 0x06;
export const API_DEVICE_SCANNER_VALUE_EVENT = "DeviceScannerValue";

export class DeviceScannerValue extends BaseModel implements IDeviceScannerValue
{
	static struct: any = {
		count: BluetoothStruct.uint8(),
		frames: BluetoothStruct.struct(
			{
				id: BluetoothStruct.uint32(),
				data: BluetoothStruct.uint8(8),
				length: BluetoothStruct.uint8(),
				timestamp: BluetoothStruct.uint64()
			},
			16
		)
	};
	static size: number = 337;

	count = 0;
	frames = [] as IDeviceScannerFrame[];

	requestPriority = true;

	constructor(data?: DataView)
	{
		super();

		for (let i = 0; i < 16; i++)
		{
			this.frames.push({
				receive: false,
				send: false,
				id: 0,
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				length: 0,
				timestamp: BigInt(0)
			} as IDeviceScannerFrame);
		}

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
			API_DEVICE_SCANNER_VALUE_EXEC,
			DeviceScannerValue.size,
			new BluetoothStruct(DeviceScannerValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		const buf: DataView = new DataView(new ArrayBuffer(3));
		buf.setUint8(0, API_DEVICE_SCANNER_VALUE_EXEC);
		buf.setUint16(1, 0, true);
		return buf;
	}
}
