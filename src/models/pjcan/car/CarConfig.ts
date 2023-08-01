import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ICarConfig } from "./ICarConfig";
import { ECarModel } from "./ECarModel";

export const API_CAR_CONFIG_EXEC = 50;
export const API_CAR_CONFIG_EVENT = "CarConfig";

/** Модель параметров автомобиля */
export class CarConfig extends BaseModel implements ICarConfig
{
	static struct: any = {
		lcd: BluetoothStruct.bit(),
		carModel: BluetoothStruct.uint8(),
		logo: BluetoothStruct.char(13),
		hello: BluetoothStruct.char(33)
	};
	static size: number = 48;

	lcd = false;
	carModel = ECarModel.CAR_MODEL_NONE;
	logo = "";
	hello = "";

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
		return this._set(this, API_CAR_CONFIG_EXEC, CarConfig.size + 1, new BluetoothStruct(CarConfig.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_CAR_CONFIG_EXEC, CarConfig.size + 1, new BluetoothStruct(CarConfig.struct));
	}
}
