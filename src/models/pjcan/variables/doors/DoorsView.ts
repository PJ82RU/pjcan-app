import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IDoorsView } from "./IDoorsView";

export const API_VARIABLE_DOORS_VIEW_EXEC = 131;
export const API_VARIABLE_DOORS_VIEW_EVENT = "VariableDoorsView";

/** Модель параметров отображения данных дверей */
export class DoorsView extends BaseModel implements IDoorsView
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
		return this._set(
			this,
			API_VARIABLE_DOORS_VIEW_EXEC,
			DoorsView.size + 1,
			new BluetoothStruct(DoorsView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_DOORS_VIEW_EXEC, DoorsView.size + 1, new BluetoothStruct(DoorsView.struct));
	}
}
