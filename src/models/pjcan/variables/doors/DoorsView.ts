import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_DOORS_VIEW = 131; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных дверей */
export interface IDoorsView extends IBaseModel {
	doors: IViewConfig;
}

/** Структура данных */
export const StructDoorsView = {
	doors: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructDoorsView);

/** Модель параметров отображения данных дверей */
export class DoorsView extends BaseModel implements IDoorsView {
	doors = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_DOORS_VIEW, STRUCT_LENGTH, struct);
	}
}
