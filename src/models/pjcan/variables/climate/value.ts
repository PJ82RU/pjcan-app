import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_CLIMATE = 120; // команда API
const STRUCT_LENGTH = 10; // длина данных API

/** Интерфейс значений климата */
export interface IClimateValue extends IBaseModel {
	enabled: boolean;
	automode: boolean;
	ac: boolean;
	airDLegs: boolean;
	airDBody: boolean;
	airDWindshield: boolean;
	visible: boolean;
	airRate: number;
	airType: number;
	tempType: number;
	tempDisplay: number;
	temperature: number;
}

/** Структура данных */
export const StructClimateValue = {
	enabled: Struct.bit(),
	automode: Struct.bit(),
	ac: Struct.bit(),
	airDLegs: Struct.bit(),
	airDBody: Struct.bit(),
	airDWindshield: Struct.bit(),
	visible: Struct.bit(),
	airRate: Struct.uint8(),
	airType: Struct.uint8(),
	tempType: Struct.uint8(),
	tempDisplay: Struct.uint8(),
	temperature: Struct.float32()
};

const struct = new Struct(StructClimateValue);

/** Модель значений климата */
export default class ClimateValue extends BaseModel implements IClimateValue {
	enabled = false;
	automode = false;
	ac = false;
	airDLegs = false;
	airDBody = false;
	airDWindshield = false;
	visible = false;
	airRate = 0;
	airType = 0;
	tempType = 0;
	tempDisplay = 0;
	temperature = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_CLIMATE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_CLIMATE, STRUCT_LENGTH, struct);
	}
}
