import Struct from '@/components/bluetooth/struct';
import ViewConfig, { IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VARIABLE_MOVEMENT_VIEW = 161; // команда API
const STRUCT_LENGTH = 13; // длина данных API

/** Интерфейс параметров отображения данных движения */
export interface IMovementView extends IBaseModel {
	speed: IViewConfig;
	speedAVG: IViewConfig;
	restWay: IViewConfig;
}

/** Структура данных */
export const StructMovementView = {
	speed: Struct.struct(StructViewConfig),
	speedAVG: Struct.struct(StructViewConfig),
	restWay: Struct.struct(StructViewConfig)
};

const struct = new Struct(StructMovementView);

/** Модель параметров отображения данных движения */
export default class MovementView extends BaseModel implements IMovementView {
	speed = new ViewConfig();
	speedAVG = new ViewConfig();
	restWay = new ViewConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_MOVEMENT_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_MOVEMENT_VIEW, STRUCT_LENGTH, struct);
	}
}
