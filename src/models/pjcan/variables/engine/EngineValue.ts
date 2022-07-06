// noinspection SpellCheckingInspection

import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../../BaseModel';

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
	enabled: BluetoothStruct.bit(),
	coolant: BluetoothStruct.uint8(),
	rpm: BluetoothStruct.uint16(),
	mseconds: BluetoothStruct.uint32(),
	countRPM: BluetoothStruct.float32(),
	load: BluetoothStruct.float32(),
	throttle: BluetoothStruct.float32()
};

const struct = new BluetoothStruct(StructEngineValue);

/** Модель значений ДВС */
export class EngineValue extends BaseModel implements IEngineValue {
	enabled = false;
	coolant = 0;
	rpm = 0;
	mseconds = 0;
	countRPM = 0;
	load = 0;
	throttle = 0;

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

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
