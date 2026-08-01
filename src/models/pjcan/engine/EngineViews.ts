import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ViewConfig } from "../view";
import { IEngineViews } from "./IEngineViews";

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

export const API_ENGINE_VIEW_OIL_LIFE_PERCENT_EXEC = 0x9b;
export const API_ENGINE_VIEW_OIL_LIFE_PERCENT_EVENT = "EngineViewOilLifePercent";

export const API_ENGINE_VIEW_OIL_LIFE_DISTANCE_EXEC = 0x9c;
export const API_ENGINE_VIEW_OIL_LIFE_DISTANCE_EVENT = "EngineViewOilLifeDistance";

/** Модель параметров отображения данных ДВС */
export class EngineViews extends BaseModel implements IEngineViews
{
	static struct: any = {
		enabled: BluetoothStruct.struct(ViewConfig.struct),
		totalWorktime: BluetoothStruct.struct(ViewConfig.struct),
		totalCountRPM: BluetoothStruct.struct(ViewConfig.struct),
		coolant: BluetoothStruct.struct(ViewConfig.struct),
		rpm: BluetoothStruct.struct(ViewConfig.struct),
		load: BluetoothStruct.struct(ViewConfig.struct),
		throttle: BluetoothStruct.struct(ViewConfig.struct),
		oilLifePercent: BluetoothStruct.struct(ViewConfig.struct),
		oilLifeDistance: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = 36;

	enabled = new ViewConfig(API_ENGINE_VIEW_ENABLED_EXEC);
	totalWorktime = new ViewConfig(API_ENGINE_VIEW_TOTAL_WORKTIME_EXEC);
	totalCountRPM = new ViewConfig(API_ENGINE_VIEW_TOTAL_COUNT_RPM_EXEC);
	coolant = new ViewConfig(API_ENGINE_VIEW_COOLANT_EXEC);
	rpm = new ViewConfig(API_ENGINE_VIEW_RPM_EXEC);
	load = new ViewConfig(API_ENGINE_VIEW_LOAD_EXEC);
	throttle = new ViewConfig(API_ENGINE_VIEW_THROTTLE_EXEC);
	oilLifePercent = new ViewConfig(API_ENGINE_VIEW_OIL_LIFE_PERCENT_EXEC);
	oilLifeDistance = new ViewConfig(API_ENGINE_VIEW_OIL_LIFE_DISTANCE_EXEC);

	constructor(data?: DataView)
	{
		super(API_ENGINE_VIEW_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(this, this.exec, EngineViews.size, new BluetoothStruct(EngineViews.struct), buf);
		if (result)
		{
			this.enabled.isData = true;
			this.totalWorktime.isData = true;
			this.totalCountRPM.isData = true;
			this.coolant.isData = true;
			this.rpm.isData = true;
			this.load.isData = true;
			this.throttle.isData = true;
			this.oilLifePercent.isData = true;
			this.oilLifeDistance.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
