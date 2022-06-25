import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_MOVEMENT = 160; // команда API
const STRUCT_LENGTH = 13; // длина данных API

/** Интерфейс значений движения */
export interface IMovementValue extends IBaseModel {
	speed: number;
	speedAVG: number;
	restWay: number;
}

/** Структура данных */
export const StructMovementValue = {
	speed: Struct.float32(),
	speedAVG: Struct.float32(),
	restWay: Struct.float32()
};

const struct = new Struct(StructMovementValue);

/** Модель значений движения */
export class MovementValue extends BaseModel implements IMovementValue {
	speed = 0;
	speedAVG = 0;
	restWay = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_MOVEMENT, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_MOVEMENT, STRUCT_LENGTH, struct);
	}
}
