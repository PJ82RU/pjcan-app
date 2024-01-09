import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITeyesText } from "./ITeyesText";

export const API_TEYES_TEXT_EXEC = 0x51;
export const API_TEYES_TEXT_EVENT = "TeyesText";

export const API_TEYES_TEXT_VIEW_EXEC = 0x53;
export const API_TEYES_TEXT_VIEW_EVENT = "TeyesTextView";

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
		return this._set(this, API_TEYES_TEXT_EXEC, TeyesText.size, new BluetoothStruct(TeyesText.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, API_TEYES_TEXT_EXEC)
			: this._get(this, API_TEYES_TEXT_EXEC, TeyesText.size, new BluetoothStruct(TeyesText.struct));
	}
}
