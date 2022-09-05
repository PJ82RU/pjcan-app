import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_BUTTONS_CONFIG = 20; // команда API
const STRUCT_LENGTH = 63; // длина данных API

export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

/** Список ID кнопки */
export enum TButtonItem {
	BUTTON_MODE = 0, // кнопка mode
	BUTTON_SEEK_UP = 1, // кнопка set up
	BUTTON_SEEK_DOWN = 2, // кнопка set down
	BUTTON_VOL_UP = 3, // кнопка уровень звука +
	BUTTON_VOL_DOWN = 4, // кнопка уровень звука -
	BUTTON_VOL_MUTE = 5 // кнопка выкл. звука
}

/** Список ID действий кнопки */
export enum TButtonPress {
	RELEASE = 0,
	PRESS_SINGLE = 1,
	PRESS_DUAL = 2,
	PRESS_TRIPLE = 3,
	PRESS_HOLD = 4
}

/** Список ID функций кнопки */
export enum TButtonExec {
	TEYES_NONE = 0, // кнопка отпущена
	TEYES_MODE = 1, // кнопка mode
	TEYES_SEEK_UP = 2, // кнопка set up
	TEYES_SEEK_DOWN = 3, // кнопка set down
	TEYES_VOL_UP = 4, // кнопка уровень звука +
	TEYES_VOL_DOWN = 5, // кнопка уровень звука -
	TEYES_VOL_MUTE = 6, // кнопка выкл. звука
	LCD_CLOCK_PRESS = 7, // кнопка Clock на LCD (нажата)
	LCD_CLOCK_RELEASE = 8, // кнопка Clock на LCD (отпущена)
	LCD_CLOCK_H_PRESS = 9, // кнопка Clock H на LCD (нажата)
	LCD_CLOCK_H_RELEASE = 10, // кнопка Clock H на LCD (отпущена)
	LCD_CLOCK_M_PRESS = 11, // кнопка Clock M на LCD (нажата)
	LCD_CLOCK_M_RELEASE = 12, // кнопка Clock M на LCD (отпущена)
	LCD_INFO_PRESS = 13, // кнопка Info на LCD (нажата)
	LCD_INFO_RELEASE = 14, // кнопка Info на LCD (отпущена)
	VARIABLE_ENGINE = 15, // кнопка показать значения ДВС
	VARIABLE_FUEL = 16, // кнопка показать значения расхода
	VARIABLE_MOVEMENT = 17, // кнопка показать значения движения
	VARIABLE_TEMPERATURE = 18 // кнопка показать значения температуру
}

/** Интерфейс параметров кнопки */
export interface IButtonsConfigItem {
	hold: number; // время удержания кнопки, сек.
	inR: number; // сопротивление нажатий
	outR: number; // сопротивление эмуляции нажатий
	exec: TButtonExec[]; // список ID функций кнопки
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

	constructor(data?: DataView) {
		super();
		for (let i = 0; i < BUTTON_NUMBER; i++) {
			let item: IButtonsConfigItem = { hold: 0, inR: 0, outR: 0, exec: [] } as IButtonsConfigItem;
			for (let j = 0; j < BUTTON_PRESS_TYPE_NUMBER; j++) item.exec.push(0);
			this.items.push(item);
		}
		if (data) this.set(data);
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
