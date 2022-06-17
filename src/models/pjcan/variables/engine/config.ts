import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

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
	showDays: Struct.bit(),
	totalSeconds: Struct.uint32(),
	totalCountRPM: Struct.uint32()
};

const struct = new Struct(StructEngineConfig);

/** Модель конфигурации ДВС */
export default class EngineConfig extends BaseModel implements IEngineConfig {
	showDays = false;
	totalSeconds = 0;
	totalCountRPM = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_ENGINE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_ENGINE_CONFIG, STRUCT_LENGTH, struct);
	}
}
