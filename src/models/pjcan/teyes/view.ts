import { Struct } from '@/components/bluetooth/struct';
import { ViewConfig, IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_TEYES_VIEW = 32; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных Teyes */
export interface ITeyesView extends IBaseModel {
	teyes: IViewConfig;
}

/** Структура данных */
export const StructTeyesView = {
	teyes: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructTeyesView);

/** Модель параметров отображения данных Teyes */
export class TeyesView extends BaseModel implements ITeyesView {
	teyes = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_TEYES_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_TEYES_VIEW, STRUCT_LENGTH, struct);
	}
}
