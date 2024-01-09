import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonValue } from "./IButtonValue";
import { TButtonType } from "@/models/pjcan/buttons/TButtonType";
import { TButtonExec } from "@/models/pjcan/buttons/TButtonExec";

export const API_BUTTON_SW1_VALUE_EXEC = 0x31;
export const API_BUTTON_SW1_VALUE_EVENT = "ButtonSW1Value";

export const API_BUTTON_SW3_VALUE_EXEC = 0x3b;
export const API_BUTTON_SW3_VALUE_EVENT = "ButtonSW3Value";

/** Модель значений кнопок */
export class ButtonValue extends BaseModel implements IButtonValue
{
	static struct: any = {
		index: BluetoothStruct.int8(),
		exec: BluetoothStruct.uint8(),
		execMode: BluetoothStruct.uint8(),
		count: BluetoothStruct.uint8(),
		type: BluetoothStruct.uint8(),
		resistance: BluetoothStruct.uint16()
	};
	static size: number = 7;

	index = -1;
	exec = TButtonExec.BUTTON_EXEC_NONE;
	execMode = TButtonExec.BUTTON_EXEC_NONE;
	count = 0;
	type = TButtonType.PRESS_RELEASE;
	resistance = 0;

	api_exec = 0;

	constructor(exec: number, data?: DataView)
	{
		super();
		this.api_exec = exec;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.api_exec, ButtonValue.size, new BluetoothStruct(ButtonValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.api_exec);
	}
}
