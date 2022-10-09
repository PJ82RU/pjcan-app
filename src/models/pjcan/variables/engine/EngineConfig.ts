import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_ENGINE_CONFIG = 141; // команда API
const STRUCT_LENGTH = 10; // длина данных API

/** Интерфейс конфигурации ДВС */
export interface IEngineConfig extends IBaseModel {
	showDays: boolean;
	totalSeconds: number;
	totalCountRPM: number;
}

/** Структура данных */
export const StructEngineConfig = {
	showDays: BluetoothStruct.bit(),
	totalSeconds: BluetoothStruct.uint32(),
	totalCountRPM: BluetoothStruct.uint32()
};

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
		return this._set(this, API_EXEC_VARIABLE_ENGINE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_ENGINE_CONFIG, STRUCT_LENGTH, struct);
	}
}
