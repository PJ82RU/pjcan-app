import { BluetoothStruct } from '@/components/bluetooth';
import { ViewConfig, IViewConfig, StructViewConfig } from '../../view/index';
import { BaseModel, IBaseModel } from '../../BaseModel';

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
	speed: BluetoothStruct.struct(StructViewConfig),
	speedAVG: BluetoothStruct.struct(StructViewConfig),
	restWay: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructMovementView);

/** Модель параметров отображения данных движения */
export class MovementView extends BaseModel implements IMovementView {
	speed = new ViewConfig();
	speedAVG = new ViewConfig();
	restWay = new ViewConfig();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_MOVEMENT_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_MOVEMENT_VIEW, STRUCT_LENGTH, struct);
	}
}
