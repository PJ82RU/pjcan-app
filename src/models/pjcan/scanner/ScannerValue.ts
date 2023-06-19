import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IScannerValue } from "./IScannerValue";
import { IScannerFrame } from "./IScannerFrame";
import { API_SCANNER_VALUE_SIZE, StructScannerValue } from "./StructScannerValue";
import { API_SCANNER_FRAME_SIZE } from "@/models/pjcan/scanner/StructScannerFrame";

export const API_SCANNER_VALUE_EXEC = 61;
export const API_SCANNER_VALUE_EVENT = "ScannerValue";

const struct = new BluetoothStruct(StructScannerValue);

export class ScannerValue extends BaseModel implements IScannerValue
{
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
		return this._set(this, API_SCANNER_VALUE_EXEC, API_SCANNER_VALUE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		const buf: DataView = new DataView(new ArrayBuffer(1));
		buf.setUint8(0, API_SCANNER_VALUE_EXEC);
		return buf;
	}
}
