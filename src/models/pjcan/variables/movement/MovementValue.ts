import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructMovementValue } from "./StructMovementValue";
import { IMovementValue } from "./IMovementValue";

export const API_EXEC_VARIABLE_MOVEMENT = 160; // команда API
const STRUCT_LENGTH = 13; // длина данных API

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
		return this._set(this, API_EXEC_VARIABLE_MOVEMENT, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_MOVEMENT, STRUCT_LENGTH, struct);
	}
}
