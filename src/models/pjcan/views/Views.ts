import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { CarView } from "../car";
import { VariableView } from "../variables/views/VariablesView";
import { TeyesView } from "../teyes";
import { IViews, StructViews } from "./index";

export const API_EXEC_VIEW = 2;
const STRUCT_LENGTH = 109;

const struct = new BluetoothStruct(StructViews);

export class Views extends BaseModel implements IViews
{
	car = new CarView();
	teyes = new TeyesView();
	variable = new VariableView();

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
		return this._set(this, API_EXEC_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VIEW, 1);
	}
}
