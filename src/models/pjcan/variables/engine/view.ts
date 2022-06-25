import { Struct } from '@/components/bluetooth/struct';
import { ViewConfig, IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_ENGINE_VIEW = 142; // команда API
const STRUCT_LENGTH = 29; // длина данных API

/** Интерфейс параметров отображения данных ДВС */
export interface IEngineView extends IBaseModel {
	enabled: IViewConfig;
	totalSeconds: IViewConfig;
	totalCountRPM: IViewConfig;
	coolant: IViewConfig;
	rpm: IViewConfig;
	load: IViewConfig;
	throttle: IViewConfig;
}

/** Структура данных */
export const StructEngineView = {
	enabled: Struct.struct(StructViewConfig),
	totalSeconds: Struct.struct(StructViewConfig),
	totalCountRPM: Struct.struct(StructViewConfig),
	coolant: Struct.struct(StructViewConfig),
	rpm: Struct.struct(StructViewConfig),
	load: Struct.struct(StructViewConfig),
	throttle: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructEngineView);

/** Модель параметров отображения данных ДВС */
export class EngineView extends BaseModel implements IEngineView {
	enabled = new ViewConfig();
	totalSeconds = new ViewConfig();
	totalCountRPM = new ViewConfig();
	coolant = new ViewConfig();
	rpm = new ViewConfig();
	load = new ViewConfig();
	throttle = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_ENGINE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_ENGINE_VIEW, STRUCT_LENGTH, struct);
	}
}
