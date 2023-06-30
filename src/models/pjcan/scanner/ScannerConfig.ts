import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { IScannerConfig } from "./IScannerConfig";

export const API_SCANNER_CONFIG_EXEC = 60;
export const API_SCANNER_CONFIG_EVENT = "ScannerConfig";

export class ScannerConfig extends BaseModel implements IScannerConfig
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		addSend: BluetoothStruct.bit(),
		timeoutOff: BluetoothStruct.uint8()
	};
	static size: number = 2;

	enabled = false;
	addSend = false;
	timeoutOff = 5;

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
			API_SCANNER_CONFIG_EXEC,
			ScannerConfig.size + 1,
			new BluetoothStruct(ScannerConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_SCANNER_CONFIG_EXEC,
			ScannerConfig.size + 1,
			new BluetoothStruct(ScannerConfig.struct)
		);
	}
}
