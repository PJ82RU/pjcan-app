import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_SENSORS = 170; // команда API
const STRUCT_LENGTH = 3; // длина данных API

/** Интерфейс значений датчиков */
export interface ISensorsValue extends IBaseModel {
	acc: boolean;
	handbrake: boolean;
	reverse: boolean;
	seatbeltDriver: boolean;
	seatbeltPassenger: boolean;
	signal: number;
}

/** Структура данных */
export const StructSensorsValue = {
	acc: Struct.bit(),
	handbrake: Struct.bit(),
	reverse: Struct.bit(),
	seatbeltDriver: Struct.bit(),
	seatbeltPassenger: Struct.bit(),
	signal: Struct.uint8()
};

const struct = new Struct(StructSensorsValue);

/** Модель значений датчиков */
export default class SensorsValue extends BaseModel implements ISensorsValue {
	acc = false;
	handbrake = false;
	reverse = false;
	seatbeltDriver = false;
	seatbeltPassenger = false;
	signal = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_SENSORS, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_SENSORS, STRUCT_LENGTH, struct);
	}
}
