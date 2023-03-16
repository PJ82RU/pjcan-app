import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_BOSE_SIZE, StructBoseConfig } from "./StructBoseConfig";
import { IBoseConfig } from "./IBoseConfig";
import { TCenterPoint } from "./TCenterPoint";

export const API_VARIABLE_BOSE_EXEC = 110;
export const API_VARIABLE_BOSE_EVENT = "VariableBoseConfig";

const struct = new BluetoothStruct(StructBoseConfig);

/** Модель параметров Bose */
export class BoseConfig extends BaseModel implements IBoseConfig
{
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_BOSE_EXEC, API_VARIABLE_BOSE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_BOSE_EXEC, API_VARIABLE_BOSE_SIZE + 1, struct);
	}
}
