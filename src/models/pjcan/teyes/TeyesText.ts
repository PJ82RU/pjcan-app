import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_TEYES_TEXT_SIZE, StructTeyesText } from "./StructTeyesText";
import { ITeyesText } from "./ITeyesText";

export const API_TEYES_TEXT_EXEC = 31;
export const API_TEYES_TEXT_EVENT = "TeyesText";

const struct = new BluetoothStruct(StructTeyesText);

/** Модель значения текста Teyes */
export class TeyesText extends BaseModel implements ITeyesText
{
	text = "";

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
		return this._set(this, API_TEYES_TEXT_EXEC, API_TEYES_TEXT_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_TEXT_EXEC, API_TEYES_TEXT_SIZE + 1, struct);
	}
}
