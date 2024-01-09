import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IMazdaConfig } from "./IMazdaConfig";
import { TCarModel } from "./TCarModel";

export const API_MAZDA_CONFIG_EXEC = 0x40;
export const API_MAZDA_CONFIG_EVENT = "MazdaConfig";

export const API_MAZDA_VIEW_EXEC = 0x43;
export const API_MAZDA_VIEW_EVENT = "MazdaView";

/** Модель параметров автомобиля */
export class MazdaConfig extends BaseModel implements IMazdaConfig
{
	static struct: any = {
		lcd: BluetoothStruct.bit(),
		carModel: BluetoothStruct.uint8(),
		logo: BluetoothStruct.char(12),
		hello: BluetoothStruct.char(32)
	};
	static size: number = 46;

	lcd = false;
	carModel = TCarModel.CAR_MODEL_UNKNOWN;
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
		return this._set(this, API_MAZDA_CONFIG_EXEC, MazdaConfig.size, new BluetoothStruct(MazdaConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, API_MAZDA_CONFIG_EXEC)
			: this._get(this, API_MAZDA_CONFIG_EXEC, MazdaConfig.size, new BluetoothStruct(MazdaConfig.struct));
	}
}
