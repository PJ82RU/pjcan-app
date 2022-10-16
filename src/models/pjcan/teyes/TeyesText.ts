import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructTeyesText } from "./StructTeyesText";
import { ITeyesText } from "./ITeyesText";

export const API_EXEC_TEYES_TEXT = 31; // команда API
const STRUCT_LENGTH = 13; // длина данных API

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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_TEYES_TEXT, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_TEYES_TEXT, STRUCT_LENGTH, struct);
	}
}
