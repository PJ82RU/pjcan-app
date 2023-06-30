import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { ITemperatureView } from "./ITemperatureView";

export const API_VARIABLE_TEMPERATURE_VIEW_EXEC = 181;
export const API_VARIABLE_TEMPERATURE_VIEW_EVENT = "VariableTemperatureView";

/** Модель параметров отображения данных температуры */
export class TemperatureView extends BaseModel implements ITemperatureView
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
			API_VARIABLE_TEMPERATURE_VIEW_EXEC,
			TemperatureView.size + 1,
			new BluetoothStruct(TemperatureView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_TEMPERATURE_VIEW_EXEC,
			TemperatureView.size + 1,
			new BluetoothStruct(TemperatureView.struct)
		);
	}
}
