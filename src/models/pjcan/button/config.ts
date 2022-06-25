import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_BUTTONS_CONFIG = 20; // команда API
const STRUCT_LENGTH = 63; // длина данных API

export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

/** Интерфейс параметров кнопки */
export interface IConfigItem {
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
	items: IConfigItem[]; // настройки кнопок
}

/** Структура данных */
export const StructButtonsConfig = {
	enabled: Struct.bit(),
	out: Struct.bit(),
	reset: Struct.bit(),
	range: Struct.uint8(),
	items: Struct.struct(
		{
			hold: Struct.uint8(),
			inR: Struct.uint16(),
			outR: Struct.uint16(),
			exec: Struct.uint8(BUTTON_PRESS_TYPE_NUMBER)
		},
		BUTTON_NUMBER
	)
};

const struct = new Struct(StructButtonsConfig);

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig {
	enabled = false;
	out = false;
	reset = false;
	range = 0;
	items = [] as IConfigItem[];

	constructor() {
		super();
		for (let i = 0; i < BUTTON_NUMBER; i++) {
			let item: IConfigItem = { hold: 0, inR: 0, outR: 0, exec: [] } as IConfigItem;
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
