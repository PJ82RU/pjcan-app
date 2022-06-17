import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_BOSE = 110; // команда API
const STRUCT_LENGTH = 7; // длина данных API

/** Интерфейс параметров Bose */
export interface IBoseConfig extends IBaseModel {
	enabled: boolean;
	audioPLT: boolean;
	radioFM: boolean;
	wow: boolean;
	balance: number;
	bass: number;
	fade: number;
	treble: number;
	centerPoint: number;
}

/** Структура данных */
export const StructBoseConfig = {
	enabled: Struct.bit(),
	audioPLT: Struct.bit(),
	radioFM: Struct.bit(),
	wow: Struct.bit(),
	balance: Struct.int8(),
	bass: Struct.int8(),
	fade: Struct.int8(),
	treble: Struct.int8(),
	centerPoint: Struct.uint8()
};

const struct = new Struct(StructBoseConfig);

/** Модель параметров Bose */
export default class BoseConfig extends BaseModel implements IBoseConfig {
	enabled = false;
	audioPLT = false;
	radioFM = false;
	wow = false;
	balance = 0;
	bass = 0;
	fade = 0;
	treble = 0;
	centerPoint = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_BOSE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_BOSE, STRUCT_LENGTH, struct);
	}
}
