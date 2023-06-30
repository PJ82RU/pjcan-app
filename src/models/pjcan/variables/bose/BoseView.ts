import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IBoseView } from "./IBoseView";

export const API_VARIABLE_BOSE_VIEW_EXEC = 111;
export const API_VARIABLE_BOSE_VIEW_EVENT = "VariableBoseView";

/** Модель параметров отображения данных Bose */
export class BoseView extends BaseModel implements IBoseView
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
			API_VARIABLE_BOSE_VIEW_EXEC,
			BoseView.size + 1,
			new BluetoothStruct(BoseView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_BOSE_VIEW_EXEC, BoseView.size + 1, new BluetoothStruct(BoseView.struct));
	}
}
