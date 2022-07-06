import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../view/index';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_CAR_VIEW = 51; // команда API
const STRUCT_LENGTH = 9; // длина данных API

/** Интерфейс параметров отображения данных автомобиля */
export interface ICarView extends IBaseModel {
	logo: IViewConfig; // Логотип
	hello: IViewConfig; // Текст приветствия
}

/** Структура данных */
export const StructCarView = {
	logo: BluetoothStruct.struct(StructViewConfig),
	hello: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructCarView);

/** Модель параметров отображения данных автомобиля */
export class CarView extends BaseModel implements ICarView {
	logo = new ViewConfig();
	hello = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

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
