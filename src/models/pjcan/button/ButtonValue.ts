import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonValue, StructButtonsValue } from "./index";

export const API_EXEC_BUTTONS_VALUE = 21; // команда API
const STRUCT_LENGTH = 7; // длина данных API

const struct = new BluetoothStruct(StructButtonsValue);

/** Модель значений кнопок */
export class ButtonsValue extends BaseModel implements IButtonValue
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_BUTTONS_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_BUTTONS_VALUE, STRUCT_LENGTH, struct);
	}
}
