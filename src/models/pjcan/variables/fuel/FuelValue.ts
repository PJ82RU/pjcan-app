import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../../BaseModel';

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
	consumption: BluetoothStruct.float32(),
	current: BluetoothStruct.float32(),
	avg: BluetoothStruct.float32(),
	total: BluetoothStruct.float32()
};

const struct = new BluetoothStruct(StructFuelValue);

/** Модель значений расхода топлива */
export class FuelValue extends BaseModel implements IFuelValue {
	consumption = 0;
	current = 0;
	avg = 0;
	total = 0;

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_FUEL, STRUCT_LENGTH, struct);
	}
}
