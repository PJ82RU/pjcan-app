import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_VARIABLE_MOVEMENT_SIZE, StructMovementValue } from "./StructMovementValue";
import { IMovementValue } from "./IMovementValue";

export const API_VARIABLE_MOVEMENT_EXEC = 160;

const struct = new BluetoothStruct(StructMovementValue);

/** Модель значений движения */
export class MovementValue extends BaseModel implements IMovementValue
{
	speed = 0;
	speedAVG = 0;
	restWay = 0;

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
		return this._set(this, API_VARIABLE_MOVEMENT_EXEC, API_VARIABLE_MOVEMENT_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_MOVEMENT_EXEC, API_VARIABLE_MOVEMENT_SIZE + 1, struct);
	}
}
