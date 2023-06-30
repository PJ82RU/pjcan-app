import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IMovementValue } from "./IMovementValue";

export const API_VARIABLE_MOVEMENT_EXEC = 160;
export const API_VARIABLE_MOVEMENT_EVENT = "VariableMovementValue";

/** Модель значений движения */
export class MovementValue extends BaseModel implements IMovementValue
{
	static struct: any = {
		speed: BluetoothStruct.uint32(),
		speedAVG: BluetoothStruct.uint16(),
		restWay: BluetoothStruct.uint32()
	};
	static size: number = 10;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_MOVEMENT_EXEC,
			MovementValue.size + 1,
			new BluetoothStruct(MovementValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_MOVEMENT_EXEC,
			MovementValue.size + 1,
			new BluetoothStruct(MovementValue.struct)
		);
	}
}
