import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { ICarView } from "./ICarView";

export const API_CAR_VIEW_EXEC = 51;
export const API_CAR_VIEW_EVENT = "CarView";

/** Модель параметров отображения данных автомобиля */
export class CarView extends BaseModel implements ICarView
{
	static struct: any = {
		logo: BluetoothStruct.struct(ViewConfig.struct),
		hello: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size * 2;

	logo = new ViewConfig();
	hello = new ViewConfig();

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
		return this._set(this, API_CAR_VIEW_EXEC, CarView.size + 1, new BluetoothStruct(CarView.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_CAR_VIEW_EXEC, CarView.size + 1, new BluetoothStruct(CarView.struct));
	}
}
