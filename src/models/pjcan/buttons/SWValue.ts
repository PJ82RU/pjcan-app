import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonValue } from "./IButtonValue";
import { TButtonExec } from "./TButtonExec";
import { TButtonPress } from "./TButtonPress";

export const API_SW1_VALUE_EXEC = 0x31;
export const API_SW1_VALUE_EVENT = "SW1Value";

export const API_SW3_VALUE_EXEC = 0x3b;
export const API_SW3_VALUE_EVENT = "SW3Value";

/** Модель значений кнопок */
export class SWValue extends BaseModel implements IButtonValue
{
	static struct: any = {
		pressed: BluetoothStruct.bit(),
		swtch: BluetoothStruct.bit(),
		emulation: BluetoothStruct.bit(),
		id: BluetoothStruct.uint8(),
		btnType: BluetoothStruct.uint8(),
		btnExec: BluetoothStruct.uint8(),
		resistance: BluetoothStruct.uint16()
	};
	static size: number = 6;

	pressed = false;
	swtch = false;
	emulation = false;
	id = 0;
	btnType = TButtonPress.PRESS_PRESSED;
	btnExec = TButtonExec.BUTTON_EXEC_NONE;
	resistance = 0;

	constructor(exec: number = API_SW1_VALUE_EXEC, data?: DataView)
	{
		super(exec);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, SWValue.size, new BluetoothStruct(SWValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
