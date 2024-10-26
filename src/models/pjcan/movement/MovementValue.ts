import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IMovementValue } from "./IMovementValue";

export const API_MOVEMENT_VALUE_EXEC = 0xb1;
export const API_MOVEMENT_VALUE_EVENT = "MovementValue";

/** Модель значений движения */
export class MovementValue extends BaseModel implements IMovementValue
{
	static struct: any = {
		speed: BluetoothStruct.uint32(),
		speedAVG: BluetoothStruct.uint8(),
		restWay: BluetoothStruct.uint32()
	};
	static size: number = 9;

	speed = 0;
	speedAVG = 0;
	restWay = 0;

	constructor(data?: DataView)
	{
		super(API_MOVEMENT_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, MovementValue.size, new BluetoothStruct(MovementValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
