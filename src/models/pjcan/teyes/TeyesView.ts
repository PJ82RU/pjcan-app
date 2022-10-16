import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { StructTeyesView } from "./StructTeyesView";
import { ITeyesView } from "./ITeyesView";

export const API_EXEC_TEYES_VIEW = 32; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructTeyesView);

/** Модель параметров отображения данных Teyes */
export class TeyesView extends BaseModel implements ITeyesView
{
	teyes = new ViewConfig();

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
		return this._set(this, API_EXEC_TEYES_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_TEYES_VIEW, STRUCT_LENGTH, struct);
	}
}
