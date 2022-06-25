import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_FUEL = 150; // команда API
const STRUCT_LENGTH = 17; // длина данных API

/** Интерфейс значений расхода топлива */
export interface IFuelValue extends IBaseModel {
	consumption: number;
	current: number;
	avg: number;
	total: number;
}

/** Структура данных */
export const StructFuelValue = {
	consumption: Struct.float32(),
	current: Struct.float32(),
	avg: Struct.float32(),
	total: Struct.float32()
};

const struct = new Struct(StructFuelValue);

/** Модель значений расхода топлива */
export default class FuelValue extends BaseModel implements IFuelValue {
	consumption = 0;
	current = 0;
	avg = 0;
	total = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct);
	}
}