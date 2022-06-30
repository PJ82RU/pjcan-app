import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_BUTTONS_CONFIG = 20; // команда API
const STRUCT_LENGTH = 63; // длина данных API

export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

/** Интерфейс параметров кнопки */
export interface IButtonsConfigItem {
	hold: number; // время удержания кнопки, сек.
	inR: number; // сопротивление нажатий
	outR: number; // сопротивление эмуляции нажатий
	exec: number[]; // список ID функций кнопки
}

/** Интерфейс кнопки */
export interface IButtonsConfig extends IBaseModel {
	enabled: boolean; // вкл/выкл. кнопок
	out: boolean; // вкл/выкл. эмуляции кнопок
	reset: boolean; // сбросить значения
	range: number; // диапазон сигнала (по умолчанию 10)
	items: IButtonsConfigItem[]; // настройки кнопок
}

/** Структура данных */
export const StructButtonsConfig = {
	enabled: BluetoothStruct.bit(),
	out: BluetoothStruct.bit(),
	reset: BluetoothStruct.bit(),
	range: BluetoothStruct.uint8(),
	items: BluetoothStruct.struct(
		{
			hold: BluetoothStruct.uint8(),
			inR: BluetoothStruct.uint16(),
			outR: BluetoothStruct.uint16(),
			exec: BluetoothStruct.uint8(BUTTON_PRESS_TYPE_NUMBER)
		},
		BUTTON_NUMBER
	)
};

const struct = new BluetoothStruct(StructButtonsConfig);

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig {
	enabled = false;
	out = false;
	reset = false;
	range = 0;
	items = [] as IButtonsConfigItem[];

	constructor() {
		super();
		for (let i = 0; i < BUTTON_NUMBER; i++) {
			let item: IButtonsConfigItem = { hold: 0, inR: 0, outR: 0, exec: [] } as IButtonsConfigItem;
			for (let j = 0; j < BUTTON_PRESS_TYPE_NUMBER; j++) item.exec.push(0);
			this.items.push(item);
		}
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_BUTTONS_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_BUTTONS_CONFIG, STRUCT_LENGTH, struct);
	}
}
