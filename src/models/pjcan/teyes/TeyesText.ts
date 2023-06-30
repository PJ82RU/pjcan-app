import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITeyesText } from "./ITeyesText";

export const API_TEYES_TEXT_EXEC = 31;
export const API_TEYES_TEXT_EVENT = "TeyesText";

/** Модель значения текста Teyes */
export class TeyesText extends BaseModel implements ITeyesText
{
	static struct: any = {
		text: BluetoothStruct.char(12)
	};
	static size: number = 12;

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
		return this._set(this, API_TEYES_TEXT_EXEC, TeyesText.size + 1, new BluetoothStruct(TeyesText.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_TEXT_EXEC, TeyesText.size + 1, new BluetoothStruct(TeyesText.struct));
	}
}
