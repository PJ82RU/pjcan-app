import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_ENGINE_CONFIG_SIZE, StructEngineConfig } from "./StructEngineConfig";
import { IEngineConfig } from "./IEngineConfig";

export const API_VARIABLE_ENGINE_CONFIG_EXEC = 141;
export const API_VARIABLE_ENGINE_CONFIG_EVENT = "VariableEngineConfig";

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_ENGINE_CONFIG_EXEC, API_VARIABLE_ENGINE_CONFIG_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_ENGINE_CONFIG_EXEC, API_VARIABLE_ENGINE_CONFIG_SIZE + 1, struct);
	}
}
