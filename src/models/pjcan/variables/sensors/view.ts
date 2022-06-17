import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_SENSORS_VIEW = 171; // команда API
const STRUCT_LENGTH = 17; // длина данных API

/** Интерфейс параметров отображения данных датчиков */
export interface ISensorsView extends IBaseModel {
	handbrake: IViewConfig;
	reverse: IViewConfig;
	seatbelt: IViewConfig;
	signal: IViewConfig;
}

/** Структура данных */
export const StructSensorsView = {
	handbrake: Struct.struct(StructViewConfig),
	reverse: Struct.struct(StructViewConfig),
	seatbelt: Struct.struct(StructViewConfig),
	signal: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructSensorsView);

/** Модель параметров отображения данных датчиков */
export default class SensorsView extends BaseModel implements ISensorsView {
	handbrake = new ViewConfig();
	reverse = new ViewConfig();
	seatbelt = new ViewConfig();
	signal = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_SENSORS_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_SENSORS_VIEW, STRUCT_LENGTH, struct);
	}
}
