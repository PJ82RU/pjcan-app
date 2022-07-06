import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

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
	enabled: BluetoothStruct.struct(StructViewConfig),
	totalSeconds: BluetoothStruct.struct(StructViewConfig),
	totalCountRPM: BluetoothStruct.struct(StructViewConfig),
	coolant: BluetoothStruct.struct(StructViewConfig),
	rpm: BluetoothStruct.struct(StructViewConfig),
	load: BluetoothStruct.struct(StructViewConfig),
	throttle: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructEngineView);

/** Модель параметров отображения данных ДВС */
export class EngineView extends BaseModel implements IEngineView {
	enabled = new ViewConfig();
	totalSeconds = new ViewConfig();
	totalCountRPM = new ViewConfig();
	coolant = new ViewConfig();
	rpm = new ViewConfig();
	load = new ViewConfig();
	throttle = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

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
