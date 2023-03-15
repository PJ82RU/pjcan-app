import { BluetoothStruct } from "@/components/bluetooth";
import { API_SIZE_VIEW, ViewConfig } from "../view";
import { BaseModel } from "../base";
import { StructCarView } from "./StructCarView";
import { ICarView } from "./ICarView";

export const API_CAR_VIEW_EXEC = 51;
export const API_SIZE_CAR_VIEW = API_SIZE_VIEW * 2;

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
		return this._set(this, API_CAR_VIEW_EXEC, API_SIZE_CAR_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_CAR_VIEW_EXEC, API_SIZE_CAR_VIEW + 1, struct);
	}
}
