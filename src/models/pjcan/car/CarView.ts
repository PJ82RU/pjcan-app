import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { API_CAR_VIEW_SIZE, StructCarView } from "./StructCarView";
import { ICarView } from "./ICarView";

export const API_CAR_VIEW_EXEC = 51;

const struct = new BluetoothStruct(StructCarView);

/** Модель параметров отображения данных автомобиля */
export class CarView extends BaseModel implements ICarView
{
	logo = new ViewConfig();
	hello = new ViewConfig();

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
		return this._set(this, API_CAR_VIEW_EXEC, API_CAR_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_CAR_VIEW_EXEC, API_CAR_VIEW_SIZE + 1, struct);
	}
}
