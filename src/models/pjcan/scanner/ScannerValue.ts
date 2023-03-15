import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IScannerValue } from "./IScannerValue";
import { API_SCANNER_VALUE_SIZE, StructScannerValue } from "./StructScannerValue";

export const API_SCANNER_VALUE_EXEC = 61;

const struct = new BluetoothStruct(StructScannerValue);

export class ScannerValue extends BaseModel implements IScannerValue
{
	frames = [];
	count = 0;

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
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
