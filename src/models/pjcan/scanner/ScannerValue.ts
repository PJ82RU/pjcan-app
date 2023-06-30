import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IScannerValue } from "./IScannerValue";
import { IScannerFrame } from "./IScannerFrame";

export const API_SCANNER_VALUE_EXEC = 61;
export const API_SCANNER_VALUE_EVENT = "ScannerValue";
export const API_SCANNER_FRAME_COUNT = 16;
export const API_SCANNER_FRAME_SIZE = 22;

export class ScannerValue extends BaseModel implements IScannerValue
{
	static struct: any = {
		count: BluetoothStruct.uint8(),
		frames: BluetoothStruct.struct(
			{
				receive: BluetoothStruct.bit(),
				send: BluetoothStruct.bit(),
				id: BluetoothStruct.uint32(),
				data: BluetoothStruct.uint8(8),
				length: BluetoothStruct.uint8(),
				timestamp: BluetoothStruct.uint64()
			},
			API_SCANNER_FRAME_COUNT
		)
	};
	static size: number = API_SCANNER_FRAME_SIZE * API_SCANNER_FRAME_COUNT + 1;

	count = 0;
	frames = [] as IScannerFrame[];

	constructor(data?: DataView)
	{
		super();

		for (let i = 0; i < API_SCANNER_FRAME_SIZE; i++)
		{
			this.frames.push({
				receive: false,
				send: false,
				id: 0,
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				length: 0,
				timestamp: BigInt(0)
			} as IScannerFrame);
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
			API_SCANNER_VALUE_EXEC,
			ScannerValue.size + 1,
			new BluetoothStruct(ScannerValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		const buf: DataView = new DataView(new ArrayBuffer(1));
		buf.setUint8(0, API_SCANNER_VALUE_EXEC);
		return buf;
	}
}
