import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IOnboardConfig } from "./IOnboardConfig";
import { TCarModel } from "./TCarModel";

export const API_ONBOARD_CONFIG_EXEC = 0x40;
export const API_ONBOARD_CONFIG_EVENT = "OnboardConfig";

export const API_ONBOARD_VIEW_EXEC = 0x43;
export const API_ONBOARD_VIEW_EVENT = "OnboardView";

/** Модель параметров автомобиля */
export class OnboardConfig extends BaseModel implements IOnboardConfig
{
	static struct: any = {
		lcd: BluetoothStruct.bit(),
		lcdClock24: BluetoothStruct.bit(),
		carModel: BluetoothStruct.uint8(),
		logo: BluetoothStruct.char(12),
		hello: BluetoothStruct.char(32)
	};
	static size: number = 46;

	lcd = false;
	lcdClock24 = false;
	carModel = TCarModel.CAR_MODEL_UNKNOWN;
	logo = "";
	hello = "";

	constructor(data?: DataView)
	{
		super(API_ONBOARD_CONFIG_EXEC);
		this.skipActivationCheck = true;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, OnboardConfig.size, new BluetoothStruct(OnboardConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, OnboardConfig.size, new BluetoothStruct(OnboardConfig.struct));
	}
}
