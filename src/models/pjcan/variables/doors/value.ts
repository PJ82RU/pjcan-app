import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_DOORS = 130; // команда API
const STRUCT_LENGTH = 2; // длина данных API

/** Интерфейс значений дверей */
export interface IDoorsValue extends IBaseModel {
	frontLeft: boolean;
	frontRight: boolean;
	backLeft: boolean;
	backRight: boolean;
	trunk: boolean;
}

/** Структура данных */
export const StructDoorsValue = {
	frontLeft: Struct.bit(),
	frontRight: Struct.bit(),
	backLeft: Struct.bit(),
	backRight: Struct.bit(),
	trunk: Struct.bit()
};

const struct = new Struct(StructDoorsValue);

/** Модель значений дверей */
export default class DoorsValue extends BaseModel implements IDoorsValue {
	enabled = false;
	frontLeft = false;
	frontRight = false;
	backLeft = false;
	backRight = false;
	trunk = false;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_DOORS, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_DOORS, STRUCT_LENGTH, struct);
	}
}
