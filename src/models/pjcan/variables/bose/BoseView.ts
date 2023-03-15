import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VIEW_SIZE, ViewConfig } from "../../view";
import { StructBoseView } from "./StructBoseView";
import { IBoseView } from "./IBoseView";

export const API_VARIABLE_BOSE_VIEW_EXEC = 111;
export const API_SIZE_VARIABLE_BOSE_VIEW = API_VIEW_SIZE;

const struct = new BluetoothStruct(StructBoseView);

/** Модель параметров отображения данных Bose */
export class BoseView extends BaseModel implements IBoseView
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
		return this._set(this, API_VARIABLE_BOSE_VIEW_EXEC, API_SIZE_VARIABLE_BOSE_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_BOSE_VIEW_EXEC, API_SIZE_VARIABLE_BOSE_VIEW + 1, struct);
	}
}
