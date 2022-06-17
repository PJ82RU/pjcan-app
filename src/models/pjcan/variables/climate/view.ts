import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_CLIMATE_VIEW = 121; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных климата */
export interface IClimateView extends IBaseModel {
	climate: IViewConfig;
}

/** Структура данных */
export const StructClimateView = {
	climate: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructClimateView);

/** Модель параметров отображения данных климата */
export default class ClimateView extends BaseModel implements IClimateView {
	climate = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct);
	}
}
