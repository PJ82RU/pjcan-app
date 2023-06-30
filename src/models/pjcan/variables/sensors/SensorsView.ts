import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { ISensorsView } from "./ISensorsView";

export const API_VARIABLE_SENSORS_VIEW_EXEC = 171;
export const API_VARIABLE_SENSORS_VIEW_EVENT = "VariableSensorsView";

/** Модель параметров отображения данных датчиков */
export class SensorsView extends BaseModel implements ISensorsView
{
	static struct: any = {
		handbrake: BluetoothStruct.struct(ViewConfig.struct),
		reverse: BluetoothStruct.struct(ViewConfig.struct),
		seatbelt: BluetoothStruct.struct(ViewConfig.struct),
		signal: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 4;

	handbrake = new ViewConfig();
	reverse = new ViewConfig();
	seatbelt = new ViewConfig();
	signal = new ViewConfig();

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
			API_VARIABLE_SENSORS_VIEW_EXEC,
			SensorsView.size + 1,
			new BluetoothStruct(SensorsView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_SENSORS_VIEW_EXEC,
			SensorsView.size + 1,
			new BluetoothStruct(SensorsView.struct)
		);
	}
}
