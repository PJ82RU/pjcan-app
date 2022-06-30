import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_CAR_CONFIG = 50; // команда API
const STRUCT_LENGTH = 49; // длина данных API

/** Интерфейс параметров автомобиля */
export interface ICarConfig extends IBaseModel {
	lcd: boolean; // вкл. вывод данных на LCD
	carModel: number; // модель автомобиля
	logo: string; // логотип
	hello: string; // текст приветствия
}

/** Структура данных */
export const StructCarConfig = {
	lcd: BluetoothStruct.bit(),
	carModel: BluetoothStruct.uint8(),
	logo: BluetoothStruct.char(13),
	hello: BluetoothStruct.char(33)
};

const struct = new BluetoothStruct(StructCarConfig);

/** Модель параметров автомобиля */
export class CarConfig extends BaseModel implements ICarConfig {
	lcd = false;
	carModel = 0;
	logo = '';
	hello = '';

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct);
	}
}