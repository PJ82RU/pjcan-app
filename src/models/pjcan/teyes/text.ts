import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_TEYES_TEXT = 31; // команда API
const STRUCT_LENGTH = 13; // длина данных API

/** Интерфейс значения текста Teyes */
export interface ITeyesText extends IBaseModel {
	text: string;
}

/** Структура данных */
export const StructTeyesText = {
	text: Struct.char(12)
};

const struct = new Struct(StructTeyesText);

/** Модель значения текста Teyes */
export default class TeyesText extends BaseModel implements ITeyesText {
	text = '';

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_TEYES_TEXT, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_TEYES_TEXT, STRUCT_LENGTH, struct);
	}
}
