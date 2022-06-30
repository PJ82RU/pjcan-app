import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_BUTTONS_VALUE = 21; // команда API
const STRUCT_LENGTH = 7; // длина данных API

/** Интерфейс значений кнопки */
export interface IButtonValue extends IBaseModel {
	index: number; // индекс кнопки (-1 если кнопка не определена)
	exec: number; // id функции кнопки
	count: number; // счетчик нажатий кнопки
	type: number; // тип действия
	r: number; // значение сопротивления кнопки
}

/** Структура данных */
export const StructButtonsValue = {
	index: BluetoothStruct.int8(),
	exec: BluetoothStruct.uint8(),
	count: BluetoothStruct.uint8(),
	type: BluetoothStruct.uint8(),
	r: BluetoothStruct.uint16()
};

const struct = new BluetoothStruct(StructButtonsValue);

/** Модель значений кнопок */
export class ButtonsValue extends BaseModel implements IButtonValue {
	index = -1;
	exec = 0;
	count = 0;
	type = 0;
	r = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_BUTTONS_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_BUTTONS_VALUE, STRUCT_LENGTH, struct);
	}
}
