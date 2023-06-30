import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { ITeyesView } from "./ITeyesView";

export const API_TEYES_VIEW_EXEC = 32;
export const API_TEYES_VIEW_EVENT = "TeyesView";

/** Модель параметров отображения данных Teyes */
export class TeyesView extends BaseModel implements ITeyesView
{
	static struct: any = {
		view: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size;

	view = new ViewConfig();

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
		return this._set(this, API_TEYES_VIEW_EXEC, TeyesView.size + 1, new BluetoothStruct(TeyesView.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_VIEW_EXEC, TeyesView.size + 1, new BluetoothStruct(TeyesView.struct));
	}
}
