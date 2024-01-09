import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ViewConfig } from "../view";
import { IEngineView } from "./IEngineView";
import { API_FUEL_VIEW_EXEC } from "@/models/pjcan/fuel";

export const API_ENGINE_VIEW_EXEC = 0x93;
export const API_ENGINE_VIEW_EVENT = "EngineView";

export const API_ENGINE_VIEW_ENABLED_EXEC = 0x94;
export const API_ENGINE_VIEW_ENABLED_EVENT = "EngineViewEnabled";

export const API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC = 0x95;
export const API_ENGINE_VIEW_TOTAL_WORKTIME_EVENT = "EngineViewTotalWorktime";

export const API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC = 0x96;
export const API_ENGINE_VIEW_TOTAL_COUNT_RPM_EVENT = "EngineViewTotalCountRPM";

export const API_ENGINE_VIEW_COOLANT_EXEC = 0x97;
export const API_ENGINE_VIEW_COOLANT_EVENT = "EngineViewCoolant";

export const API_ENGINE_VIEW_RPM_EXEC = 0x98;
export const API_ENGINE_VIEW_RPM_EVENT = "EngineViewRPM";

export const API_ENGINE_VIEW_LOAD_EXEC = 0x99;
export const API_ENGINE_VIEW_LOAD_EVENT = "EngineViewLoad";

export const API_ENGINE_VIEW_THROTTLE_EXEC = 0x9a;
export const API_ENGINE_VIEW_THROTTLE_EVENT = "EngineViewThrottle";

/** Модель параметров отображения данных ДВС */
export class EngineView extends BaseModel implements IEngineView
{
	static struct: any = {
		enabled: BluetoothStruct.struct(ViewConfig.struct),
		totalWorktime: BluetoothStruct.struct(ViewConfig.struct),
		totalCountRPM: BluetoothStruct.struct(ViewConfig.struct),
		coolant: BluetoothStruct.struct(ViewConfig.struct),
		rpm: BluetoothStruct.struct(ViewConfig.struct),
		load: BluetoothStruct.struct(ViewConfig.struct),
		throttle: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 7;

	enabled = new ViewConfig(API_ENGINE_VIEW_ENABLED_EXEC);
	totalWorktime = new ViewConfig(API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC);
	totalCountRPM = new ViewConfig(API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC);
	coolant = new ViewConfig(API_ENGINE_VIEW_COOLANT_EXEC);
	rpm = new ViewConfig(API_ENGINE_VIEW_RPM_EXEC);
	load = new ViewConfig(API_ENGINE_VIEW_LOAD_EXEC);
	throttle = new ViewConfig(API_ENGINE_VIEW_THROTTLE_EXEC);

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
		return this._set(this, API_ENGINE_VIEW_EXEC, EngineView.size, new BluetoothStruct(EngineView.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_ENGINE_VIEW_EXEC);
	}
}
