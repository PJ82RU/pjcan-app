import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_TEST = 190; // команда API
const STRUCT_LENGTH = 37; // длина данных API

/** Интерфейс значений тестирования */
export interface ITestValue extends IBaseModel {
	text: string;
	view: IViewConfig;
}

/** Структура данных */
export const StructTestValue = {
	text: BluetoothStruct.char(32),
	view: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructTestValue);

/** Модель значений тестирования */
export class TestValue extends BaseModel implements ITestValue {
	text = '';
	view = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_TEST, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_TEST, STRUCT_LENGTH, struct);
	}
}
