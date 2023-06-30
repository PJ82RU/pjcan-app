import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IMovementView } from "./IMovementView";

export const API_VARIABLE_MOVEMENT_VIEW_EXEC = 161;
export const API_VARIABLE_MOVEMENT_VIEW_EVENT = "VariableMovementView";

/** Модель параметров отображения данных движения */
export class MovementView extends BaseModel implements IMovementView
{
	static struct: any = {
		speed: BluetoothStruct.struct(ViewConfig.struct),
		speedAVG: BluetoothStruct.struct(ViewConfig.struct),
		restWay: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 3;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_MOVEMENT_VIEW_EXEC,
			MovementView.size + 1,
			new BluetoothStruct(MovementView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_MOVEMENT_VIEW_EXEC,
			MovementView.size + 1,
			new BluetoothStruct(MovementView.struct)
		);
	}
}
