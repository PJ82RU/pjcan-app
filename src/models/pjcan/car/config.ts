import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

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
	lcd: Struct.bit(),
	carModel: Struct.uint8(),
	logo: Struct.char(13),
	hello: Struct.char(33)
};

const struct = new Struct(StructCarConfig);

/** Модель параметров автомобиля */
export default class CarConfig extends BaseModel implements ICarConfig {
	lcd = false;
	carModel = 0;
	logo = '';
	hello = '';

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_CAR_CONFIG, STRUCT_LENGTH, struct);
	}
}
