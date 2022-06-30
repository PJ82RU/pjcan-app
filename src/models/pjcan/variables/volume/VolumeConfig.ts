import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../../BaseModel';

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
	mute: BluetoothStruct.bit(),
	volume: BluetoothStruct.uint8(),
	max: BluetoothStruct.uint8()
};

const struct = new BluetoothStruct(StructVolumeConfig);

/** Модель конфигурации уровня звука */
export class VolumeConfig extends BaseModel implements IVolumeConfig {
	mute = false;
	volume = 0;
	max = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct);
	}
}
