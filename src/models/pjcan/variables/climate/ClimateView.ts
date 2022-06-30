import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_CLIMATE_VIEW = 121; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных климата */
export interface IClimateView extends IBaseModel {
	climate: IViewConfig;
}

/** Структура данных */
export const StructClimateView = {
	climate: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructClimateView);

/** Модель параметров отображения данных климата */
export class ClimateView extends BaseModel implements IClimateView {
	climate = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_CLIMATE_VIEW, STRUCT_LENGTH, struct);
	}
}
