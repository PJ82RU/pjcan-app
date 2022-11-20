import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VIEW, ViewConfig } from "../../view";
import { StructBoseView } from "./StructBoseView";
import { IBoseView } from "./IBoseView";

export const API_EXEC_VARIABLE_BOSE_VIEW = 111;
export const API_SIZE_VARIABLE_BOSE_VIEW = API_SIZE_VIEW;

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
		return this._set(this, API_EXEC_VARIABLE_BOSE_VIEW, API_SIZE_VARIABLE_BOSE_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_BOSE_VIEW, API_SIZE_VARIABLE_BOSE_VIEW + 1, struct);
	}
}
