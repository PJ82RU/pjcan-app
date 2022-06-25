import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_ENGINE = 140; // команда API
const STRUCT_LENGTH = 21; // длина данных API

/** Интерфейс значений ДВС */
export interface IEngineValue extends IBaseModel {
	enabled: boolean;
	coolant: number;
	rpm: number;
	mseconds: number;
	countRPM: number;
	load: number;
	throttle: number;
}

/** Структура данных */
export const StructEngineValue = {
	enabled: Struct.bit(),
	coolant: Struct.uint8(),
	rpm: Struct.uint16(),
	mseconds: Struct.uint32(),
	countRPM: Struct.float32(),
	load: Struct.float32(),
	throttle: Struct.float32()
};

const struct = new Struct(StructEngineValue);

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue {
	enabled = false;
	coolant = 0;
	rpm = 0;
	mseconds = 0;
	countRPM = 0;
	load = 0;
	throttle = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_ENGINE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_ENGINE, STRUCT_LENGTH, struct);
	}
}
