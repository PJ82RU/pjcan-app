import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { StructBoseView } from "./StructBoseView";
import { IBoseView } from "./IBoseView";

export const API_EXEC_VARIABLE_BOSE_VIEW = 111; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructBoseView);

/** Модель параметров отображения данных Bose */
export class BoseView extends BaseModel implements IBoseView
{
	bose = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct);
	}
}
