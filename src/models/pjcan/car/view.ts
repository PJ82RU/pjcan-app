import { Struct } from '@/components/bluetooth/struct';
import { ViewConfig, IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_CAR_VIEW = 51; // команда API
const STRUCT_LENGTH = 9; // длина данных API

/** Интерфейс параметров отображения данных автомобиля */
export interface ICarView extends IBaseModel {
	logo: IViewConfig; // Логотип
	hello: IViewConfig; // Текст приветствия
}

/** Структура данных */
export const StructCarView = {
	logo: Struct.struct(StructViewConfig),
	hello: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructCarView);

/** Модель параметров отображения данных автомобиля */
export class CarView extends BaseModel implements ICarView {
	logo = new ViewConfig();
	hello = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_CAR_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_CAR_VIEW, STRUCT_LENGTH, struct);
	}
}
