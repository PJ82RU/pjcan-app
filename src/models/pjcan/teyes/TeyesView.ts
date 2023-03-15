import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { API_TEYES_VIEW_SIZE, StructTeyesView } from "./StructTeyesView";
import { ITeyesView } from "./ITeyesView";

export const API_TEYES_VIEW_EXEC = 32;

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
		return this._set(this, API_TEYES_VIEW_EXEC, API_TEYES_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_VIEW_EXEC, API_TEYES_VIEW_SIZE + 1, struct);
	}
}
