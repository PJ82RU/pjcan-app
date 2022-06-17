import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_BOSE_VIEW = 111; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных Bose */
export interface IBoseView extends IBaseModel {
	bose: IViewConfig;
}

/** Структура данных */
export const StructBoseView = {
	bose: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructBoseView);

/** Модель параметров отображения данных Bose */
export default class BoseView extends BaseModel implements IBoseView {
	bose = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct);
	}
}
