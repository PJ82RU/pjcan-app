import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_DOORS_VIEW_SIZE, StructDoorsView } from "./StructDoorsView";
import { IDoorsView } from "./IDoorsView";

export const API_VARIABLE_DOORS_VIEW_EXEC = 131;
export const API_VARIABLE_DOORS_VIEW_EVENT = "VariableDoorsView";

const struct = new BluetoothStruct(StructDoorsView);

/** Модель параметров отображения данных дверей */
export class DoorsView extends BaseModel implements IDoorsView
{
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
		return this._set(this, API_VARIABLE_DOORS_VIEW_EXEC, API_VARIABLE_DOORS_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_DOORS_VIEW_EXEC, API_VARIABLE_DOORS_VIEW_SIZE + 1, struct);
	}
}
