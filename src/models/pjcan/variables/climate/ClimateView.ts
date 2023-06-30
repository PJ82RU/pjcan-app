import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IClimateView } from "./IClimateView";

export const API_VARIABLE_CLIMATE_VIEW_EXEC = 121;
export const API_VARIABLE_CLIMATE_VIEW_EVENT = "VariableClimateView";

/** Модель параметров отображения данных климата */
export class ClimateView extends BaseModel implements IClimateView
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
			API_VARIABLE_CLIMATE_VIEW_EXEC,
			ClimateView.size + 1,
			new BluetoothStruct(ClimateView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_CLIMATE_VIEW_EXEC,
			ClimateView.size + 1,
			new BluetoothStruct(ClimateView.struct)
		);
	}
}
