import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ViewConfig } from "../view";
import { IMovementView } from "./IMovementView";

export const API_MOVEMENT_VIEW_EXEC = 0xb3;
export const API_MOVEMENT_VIEW_EVENT = "MovementView";

export const API_MOVEMENT_VIEW_SPEED_EXEC = 0xb4;
export const API_MOVEMENT_VIEW_SPEED_EVENT = "MovementViewSpeed";

export const API_MOVEMENT_VIEW_SPEED_AVG_EXEC = 0xb5;
export const API_MOVEMENT_VIEW_SPEED_AVG_EVENT = "MovementViewSpeedAVG";

export const API_MOVEMENT_VIEW_REST_WAY_EXEC = 0xb6;
export const API_MOVEMENT_VIEW_REST_WAY_EVENT = "MovementViewRestWay";

/** Модель параметров отображения данных движения */
export class MovementView extends BaseModel implements IMovementView
{
	static struct: any = {
		speed: BluetoothStruct.struct(ViewConfig.struct),
		speedAVG: BluetoothStruct.struct(ViewConfig.struct),
		restWay: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = 12;

	speed = new ViewConfig(API_MOVEMENT_VIEW_SPEED_EXEC);
	speedAVG = new ViewConfig(API_MOVEMENT_VIEW_SPEED_AVG_EXEC);
	restWay = new ViewConfig(API_MOVEMENT_VIEW_REST_WAY_EXEC);

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
			API_MOVEMENT_VIEW_EXEC,
			MovementView.size,
			new BluetoothStruct(MovementView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_MOVEMENT_VIEW_EXEC);
	}
}
