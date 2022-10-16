import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig } from "../view";
import { BaseModel } from "../base";
import { StructCarView } from "./StructCarView";
import { ICarView } from "./ICarView";

export const API_EXEC_CAR_VIEW = 51; // команда API
const STRUCT_LENGTH = 9; // длина данных API

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
		return this._set(this, API_EXEC_CAR_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_CAR_VIEW, STRUCT_LENGTH, struct);
	}
}
