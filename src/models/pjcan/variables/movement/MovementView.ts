import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VIEW, ViewConfig } from "../../view";
import { StructMovementView } from "./StructMovementView";
import { IMovementView } from "./IMovementView";

export const API_VARIABLE_MOVEMENT_VIEW_EXEC = 161;
export const API_SIZE_VARIABLE_MOVEMENT_VIEW = API_SIZE_VIEW * 3;

const struct = new BluetoothStruct(StructMovementView);

/** Модель параметров отображения данных движения */
export class MovementView extends BaseModel implements IMovementView
{
	speed = new ViewConfig();
	speedAVG = new ViewConfig();
	restWay = new ViewConfig();

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_MOVEMENT_VIEW_EXEC, API_SIZE_VARIABLE_MOVEMENT_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_MOVEMENT_VIEW_EXEC, API_SIZE_VARIABLE_MOVEMENT_VIEW + 1, struct);
	}
}
