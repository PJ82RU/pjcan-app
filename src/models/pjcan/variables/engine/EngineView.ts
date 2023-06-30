import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IEngineView } from "./IEngineView";

export const API_VARIABLE_ENGINE_VIEW_EXEC = 142;
export const API_VARIABLE_ENGINE_VIEW_EVENT = "VariableEngineView";

/** Модель параметров отображения данных ДВС */
export class EngineView extends BaseModel implements IEngineView
{
	static struct: any = {
		enabled: BluetoothStruct.struct(ViewConfig.struct),
		totalSeconds: BluetoothStruct.struct(ViewConfig.struct),
		totalCountRPM: BluetoothStruct.struct(ViewConfig.struct),
		coolant: BluetoothStruct.struct(ViewConfig.struct),
		rpm: BluetoothStruct.struct(ViewConfig.struct),
		load: BluetoothStruct.struct(ViewConfig.struct),
		throttle: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 7;

	enabled = new ViewConfig();
	totalSeconds = new ViewConfig();
	totalCountRPM = new ViewConfig();
	coolant = new ViewConfig();
	rpm = new ViewConfig();
	load = new ViewConfig();
	throttle = new ViewConfig();

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
			API_VARIABLE_ENGINE_VIEW_EXEC,
			EngineView.size + 1,
			new BluetoothStruct(EngineView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_ENGINE_VIEW_EXEC,
			EngineView.size + 1,
			new BluetoothStruct(EngineView.struct)
		);
	}
}
