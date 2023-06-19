import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_BUTTONS_VALUE_SIZE, StructButtonsValue } from "./StructButtonsValue";
import { IButtonValue } from "./IButtonValue";

export const API_BUTTONS_VALUE_EXEC = 21;
export const API_BUTTON_EVENT = "ButtonsValue";

const struct = new BluetoothStruct(StructButtonsValue);

/** Модель значений кнопок */
export class ButtonValue extends BaseModel implements IButtonValue
{
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
		return this._set(this, API_BUTTONS_VALUE_EXEC, API_BUTTONS_VALUE_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_BUTTONS_VALUE_EXEC, API_BUTTONS_VALUE_SIZE + 1, struct);
	}
}
