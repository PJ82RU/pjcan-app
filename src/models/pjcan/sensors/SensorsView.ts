import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ViewConfig } from "../view";
import { ISensorsView } from "./ISensorsView";

export const API_SENSORS_VIEW_EXEC = 0xc3;
export const API_SENSORS_VIEW_EVENT = "SensorsView";

export const API_SENSORS_VIEW_HANDBRAKE_EXEC = 0xc4;
export const API_SENSORS_VIEW_HANDBRAKE_EVENT = "SensorsViewHandbrake";

export const API_SENSORS_VIEW_REVERSE_EXEC = 0xc5;
export const API_SENSORS_VIEW_REVERSE_EVENT = "SensorsViewReverse";

export const API_SENSORS_VIEW_SEATBELT_EXEC = 0xc6;
export const API_SENSORS_VIEW_SEATBELT_EVENT = "SensorsViewSeatbelt";

export const API_SENSORS_VIEW_TURN_SIGNAL_EXEC = 0xc7;
export const API_SENSORS_VIEW_TURN_SIGNAL_EVENT = "SensorsViewTurnSignal";

/** Модель параметров отображения данных датчиков */
export class SensorsView extends BaseModel implements ISensorsView
{
	static struct: any = {
		handbrake: BluetoothStruct.struct(ViewConfig.struct),
		reverse: BluetoothStruct.struct(ViewConfig.struct),
		seatbelt: BluetoothStruct.struct(ViewConfig.struct),
		turnSignal: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 4;

	handbrake = new ViewConfig(API_SENSORS_VIEW_HANDBRAKE_EXEC);
	reverse = new ViewConfig(API_SENSORS_VIEW_REVERSE_EXEC);
	seatbelt = new ViewConfig(API_SENSORS_VIEW_SEATBELT_EXEC);
	turnSignal = new ViewConfig(API_SENSORS_VIEW_TURN_SIGNAL_EXEC);

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
		return this._set(this, API_SENSORS_VIEW_EXEC, SensorsView.size, new BluetoothStruct(SensorsView.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_SENSORS_VIEW_EXEC);
	}
}
