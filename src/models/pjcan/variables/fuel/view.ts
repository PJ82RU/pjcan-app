import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

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
	consumption: Struct.struct(StructViewConfig),
	current: Struct.struct(StructViewConfig),
	avg: Struct.struct(StructViewConfig),
	total: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructFuelView);

/** Модель параметров отображения данных расхода топлива */
export default class FuelView extends BaseModel implements IFuelView {
	consumption = new ViewConfig();
	current = new ViewConfig();
	avg = new ViewConfig();
	total = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_FUEL_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_FUEL_VIEW, STRUCT_LENGTH, struct);
	}
}
