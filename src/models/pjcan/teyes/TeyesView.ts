import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, ViewConfig } from "../view";
import { BaseModel } from "../base";
import { StructTeyesView } from "./StructTeyesView";
import { ITeyesView } from "./ITeyesView";

export const API_TEYES_VIEW_EXEC = 32;
export const API_SIZE_TEYES_VIEW = API_VIEW_SIZE;

const struct = new BluetoothStruct(StructTeyesView);

/** Модель параметров отображения данных Teyes */
export class TeyesView extends BaseModel implements ITeyesView
{
	view = new ViewConfig();

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
		return this._set(this, API_TEYES_VIEW_EXEC, API_SIZE_TEYES_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_VIEW_EXEC, API_SIZE_TEYES_VIEW + 1, struct);
	}
}
