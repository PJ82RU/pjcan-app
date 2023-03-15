import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructButtonsValue } from "./StructButtonsValue";
import { IButtonValue } from "./IButtonValue";

export const API_BUTTONS_VALUE_EXEC = 21;
export const API_SIZE_BUTTONS_VALUE = 6;

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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_BUTTONS_VALUE_EXEC, API_SIZE_BUTTONS_VALUE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_BUTTONS_VALUE_EXEC, API_SIZE_BUTTONS_VALUE + 1, struct);
	}
}
