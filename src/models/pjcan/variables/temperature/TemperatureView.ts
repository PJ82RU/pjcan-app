import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_TEMPERATURE_VIEW = 181; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных температуры */
export interface ITemperatureView extends IBaseModel {
	temperature: IViewConfig;
}

/** Структура данных */
export const StructTemperatureView = {
	temperature: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructTemperatureView);

/** Модель параметров отображения данных температуры */
export class TemperatureView extends BaseModel implements ITemperatureView {
	temperature = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_TEMPERATURE_VIEW, STRUCT_LENGTH, struct);
	}
}
