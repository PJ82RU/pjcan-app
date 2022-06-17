import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_TEMPERATURE_VIEW = 181; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных температуры */
export interface ITemperatureView extends IBaseModel {
	temperature: IViewConfig;
}

/** Структура данных */
export const StructTemperatureView = {
	temperature: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructTemperatureView);

/** Модель параметров отображения данных температуры */
export default class TemperatureView extends BaseModel implements ITemperatureView {
	temperature = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct);
	}
}
