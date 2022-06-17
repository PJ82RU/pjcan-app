import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_VOLUME = 200; // команда API
const STRUCT_LENGTH = 4; // длина данных API

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	mute: boolean; // Выкл. звук
	volume: number; // Уровень звука
	max: number; // Максимальный уровень звука
}

/** Структура данных */
export const StructVolumeConfig = {
	mute: Struct.bit(),
	volume: Struct.uint8(),
	max: Struct.uint8()
};

const struct = new Struct(StructVolumeConfig);

/** Модель конфигурации уровня звука */
export default class VolumeConfig extends BaseModel implements IVolumeConfig {
	mute = false;
	volume = 0;
	max = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct);
	}
}
