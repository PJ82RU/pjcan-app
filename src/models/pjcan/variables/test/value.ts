import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_TEST = 190; // команда API
const STRUCT_LENGTH = 37; // длина данных API

/** Интерфейс значений тестирования */
export interface ITestValue extends IBaseModel {
	text: string;
	view: IViewConfig;
}

/** Структура данных */
export const StructTestValue = {
	text: Struct.char(32),
	view: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructTestValue);

/** Модель значений тестирования */
export default class TestValue extends BaseModel implements ITestValue {
	text = '';
	view = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_TEST, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_TEST, STRUCT_LENGTH, struct);
	}
}
