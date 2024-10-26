import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IOnboardAction } from "./IOnboardAction";
import { TButtonExec } from "../buttons";

export const API_ONBOARD_ACTION_EXEC = 0x42;
export const API_ONBOARD_ACTION_EVENT = "OnboardAction";

/** Модель действий устройства */
export class OnboardAction extends BaseModel implements IOnboardAction
{
	static struct: any = {
		btnEmulation: BluetoothStruct.bit(),
		btnExec: BluetoothStruct.uint8()
	};
	static size: number = 2;

	btnEmulation = false;
	btnExec = TButtonExec.BUTTON_EXEC_NONE;

	constructor()
	{
		super(API_ONBOARD_ACTION_EXEC);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return false;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec, OnboardAction.size, new BluetoothStruct(OnboardAction.struct));
	}
}
