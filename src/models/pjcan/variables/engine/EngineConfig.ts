import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructEngineConfig } from "./StructEngineConfig";
import { IEngineConfig } from "./IEngineConfig";

export const API_EXEC_VARIABLE_ENGINE_CONFIG = 141;
export const API_SIZE_VARIABLE_ENGINE_CONFIG = 9;

const struct = new BluetoothStruct(StructEngineConfig);

/** Модель конфигурации ДВС */
export class EngineConfig extends BaseModel implements IEngineConfig
{
	showDays = false;
	totalSeconds = 0;
	totalCountRPM = 0;

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
		return this._set(this, API_EXEC_VARIABLE_ENGINE_CONFIG, API_SIZE_VARIABLE_ENGINE_CONFIG + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_ENGINE_CONFIG, API_SIZE_VARIABLE_ENGINE_CONFIG + 1, struct);
	}
}
