import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IDoorsView, StructDoorsView } from "./index";

export const API_EXEC_VARIABLE_DOORS_VIEW = 131; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructDoorsView);

/** Модель параметров отображения данных дверей */
export class DoorsView extends BaseModel implements IDoorsView
{
	doors = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct);
	}
}
