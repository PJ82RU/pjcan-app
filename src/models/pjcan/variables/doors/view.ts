import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_DOORS_VIEW = 131; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных дверей */
export interface IDoorsView extends IBaseModel {
	doors: IViewConfig;
}

/** Структура данных */
export const StructDoorsView = {
	doors: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructDoorsView);

/** Модель параметров отображения данных дверей */
export default class DoorsView extends BaseModel implements IDoorsView {
	doors = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct);
	}
}