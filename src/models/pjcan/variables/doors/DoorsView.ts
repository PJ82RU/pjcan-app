import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VIEW, ViewConfig } from "../../view";
import { StructDoorsView } from "./StructDoorsView";
import { IDoorsView } from "./IDoorsView";

export const API_EXEC_VARIABLE_DOORS_VIEW = 131;
export const API_SIZE_VARIABLE_DOORS_VIEW = API_SIZE_VIEW;

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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_VARIABLE_DOORS_VIEW, API_SIZE_VARIABLE_DOORS_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_DOORS_VIEW, API_SIZE_VARIABLE_DOORS_VIEW + 1, struct);
	}
}
