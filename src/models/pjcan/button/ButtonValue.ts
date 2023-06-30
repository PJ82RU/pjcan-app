import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonValue } from "./IButtonValue";

export const API_BUTTONS_VALUE_EXEC = 21;
export const API_BUTTON_EVENT = "ButtonsValue";

/** Модель значений кнопок */
export class ButtonValue extends BaseModel implements IButtonValue
{
	static struct: any = {
		index: BluetoothStruct.int8(),
		exec: BluetoothStruct.uint8(),
		count: BluetoothStruct.uint8(),
		type: BluetoothStruct.uint8(),
		r: BluetoothStruct.uint16()
	};
	static size: number = 6;

	index = -1;
	exec = 0;
	count = 0;
	type = 0;
	r = 0;

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
			API_BUTTONS_VALUE_EXEC,
			ButtonValue.size + 1,
			new BluetoothStruct(ButtonValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_BUTTONS_VALUE_EXEC, ButtonValue.size + 1, new BluetoothStruct(ButtonValue.struct));
	}
}
