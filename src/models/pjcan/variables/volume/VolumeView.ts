import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

export const API_EXEC_VARIABLE_VOLUME_VIEW = 201; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных уровня звука */
export interface IVolumeView extends IBaseModel {
	volume: IViewConfig;
}

/** Структура данных */
export const StructVolumeView = {
	volume: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructVolumeView);

/** Модель параметров отображения данных уровня звука */
export class VolumeView extends BaseModel implements IVolumeView {
	volume = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_VOLUME_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_VOLUME_VIEW, STRUCT_LENGTH, struct);
	}
}
