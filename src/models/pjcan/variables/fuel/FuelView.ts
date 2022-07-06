import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_FUEL_VIEW = 152; // команда API
const STRUCT_LENGTH = 17; // длина данных API

/** Интерфейс параметров отображения данных расхода топлива */
export interface IFuelView extends IBaseModel {
	consumption: IViewConfig;
	current: IViewConfig;
	avg: IViewConfig;
	total: IViewConfig;
}

/** Структура данных */
export const StructFuelView = {
	consumption: BluetoothStruct.struct(StructViewConfig),
	current: BluetoothStruct.struct(StructViewConfig),
	avg: BluetoothStruct.struct(StructViewConfig),
	total: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructFuelView);

/** Модель параметров отображения данных расхода топлива */
export class FuelView extends BaseModel implements IFuelView {
	consumption = new ViewConfig();
	current = new ViewConfig();
	avg = new ViewConfig();
	total = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_FUEL_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_FUEL_VIEW, STRUCT_LENGTH, struct);
	}
}
