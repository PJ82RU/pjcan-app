import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base/BaseModel";
import { StructLCDValue } from "./StructLCDValue";
import { ILCDValue } from "./ILCDValue";

export const API_EXEC_LCD_VALUE = 40; // команда API
const STRUCT_LENGTH = 16; // длина данных API

const struct = new BluetoothStruct(StructLCDValue);

/** Модель значений LCD */
export class LCDValue extends BaseModel implements ILCDValue
{
	icoCDIN = false;
	icoMDIN = false;
	icoST = false;
	icoDOLBY = false;
	icoRPT = false;
	icoRDM = false;
	icoAF = false;
	icoPTY = false;
	icoTA = false;
	icoTP = false;
	icoAUTOM = false;
	charS1 = false;
	charS2 = false;
	charS3 = false;
	charS4 = false;
	btnChange = false;
	btnInfo = false;
	btnClock = false;
	btnClockM = false;
	btnClockH = false;
	btnClockRM = false;
	flgClock24 = false;
	buffer = "";

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
		return this._set(this, API_EXEC_LCD_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_LCD_VALUE, STRUCT_LENGTH, struct);
	}
}
