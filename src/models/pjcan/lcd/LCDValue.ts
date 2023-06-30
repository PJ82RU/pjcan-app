import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ILCDValue } from "./ILCDValue";

export const API_LCD_VALUE_EXEC = 40;
export const API_LCD_EVENT = "LCDValue";

/** Модель значений LCD */
export class LCDValue extends BaseModel implements ILCDValue
{
	static struct: any = {
		icoCDIN: BluetoothStruct.bit(),
		icoMDIN: BluetoothStruct.bit(),
		icoST: BluetoothStruct.bit(),
		icoDOLBY: BluetoothStruct.bit(),
		icoRPT: BluetoothStruct.bit(),
		icoRDM: BluetoothStruct.bit(),
		icoAF: BluetoothStruct.bit(),
		icoPTY: BluetoothStruct.bit(),
		icoTA: BluetoothStruct.bit(),
		icoTP: BluetoothStruct.bit(),
		icoAUTOM: BluetoothStruct.bit(),
		charS1: BluetoothStruct.bit(),
		charS2: BluetoothStruct.bit(),
		charS3: BluetoothStruct.bit(),
		charS4: BluetoothStruct.bit(),
		btnChange: BluetoothStruct.bit(),
		btnInfo: BluetoothStruct.bit(),
		btnClock: BluetoothStruct.bit(),
		btnClockH: BluetoothStruct.bit(),
		btnClockM: BluetoothStruct.bit(),
		btnClockRM: BluetoothStruct.bit(),
		flgClock24: BluetoothStruct.bit(),
		buffer: BluetoothStruct.char(12)
	};
	static size: number = 15;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_LCD_VALUE_EXEC, LCDValue.size + 1, new BluetoothStruct(LCDValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_LCD_VALUE_EXEC, LCDValue.size + 1, new BluetoothStruct(LCDValue.struct));
	}
}
