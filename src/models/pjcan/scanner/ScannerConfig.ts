import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IScannerConfig } from "@/models/pjcan/scanner/IScannerConfig";
import { API_SCANNER_CONFIG_SIZE, StructScannerConfig } from "./StructScannerConfig";

export const API_SCANNER_CONFIG_EXEC = 60;

const struct = new BluetoothStruct(StructScannerConfig);

export class ScannerConfig extends BaseModel implements IScannerConfig
{
	enabled = false;
	addSend = false;
	timeout = 0;

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
		return this._set(this, API_SCANNER_CONFIG_EXEC, API_SCANNER_CONFIG_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_SCANNER_CONFIG_EXEC, API_SCANNER_CONFIG_SIZE + 1, struct);
	}
}
