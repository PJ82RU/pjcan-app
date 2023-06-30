import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IBoseConfig } from "./IBoseConfig";
import { TCenterPoint } from "./TCenterPoint";

export const API_VARIABLE_BOSE_EXEC = 110;
export const API_VARIABLE_BOSE_EVENT = "VariableBoseConfig";

/** Модель параметров Bose */
export class BoseConfig extends BaseModel implements IBoseConfig
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		audioPLT: BluetoothStruct.bit(),
		radioFM: BluetoothStruct.bit(),
		wow: BluetoothStruct.bit(),
		balance: BluetoothStruct.int8(),
		bass: BluetoothStruct.int8(),
		fade: BluetoothStruct.int8(),
		treble: BluetoothStruct.int8(),
		centerPoint: BluetoothStruct.uint8()
	};
	static size: number = 6;

	enabled = false;
	audioPLT = false;
	radioFM = false;
	wow = false;
	balance = 0;
	bass = 0;
	fade = 0;
	treble = 0;
	centerPoint = TCenterPoint.CENTERPOINT_OFF;

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
			API_VARIABLE_BOSE_EXEC,
			BoseConfig.size + 1,
			new BluetoothStruct(BoseConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_BOSE_EXEC, BoseConfig.size + 1, new BluetoothStruct(BoseConfig.struct));
	}
}
