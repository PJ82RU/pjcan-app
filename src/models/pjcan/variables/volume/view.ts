import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_VOLUME_VIEW = 201; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных уровня звука */
export interface IVolumeView extends IBaseModel {
	volume: IViewConfig;
}

/** Структура данных */
export const StructVolumeView = {
	volume: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructVolumeView);

/** Модель параметров отображения данных уровня звука */
export default class VolumeView extends BaseModel implements IVolumeView {
	volume = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_VOLUME_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_VOLUME_VIEW, STRUCT_LENGTH, struct);
	}
}
