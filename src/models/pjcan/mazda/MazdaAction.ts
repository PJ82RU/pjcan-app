import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IMazdaAction } from "./IMazdaAction";
import { TMazdaButton } from "./TMazdaButton";

export const API_MAZDA_ACTION_EXEC = 0x42;
export const API_MAZDA_ACTION_EVENT = "MazdaAction";

/** Модель действий устройства */
export class MazdaAction extends BaseModel implements IMazdaAction
{
	static struct: any = {
		btnPress: BluetoothStruct.bit(),
		btnSimulation: BluetoothStruct.bit(),
		btnType: BluetoothStruct.uint8(),
		timePress: BluetoothStruct.uint16()
	};
	static size: number = 4;

	btnPress = false;
	btnSimulation = false;
	btnType = TMazdaButton.MAZDA_BUTTON_NONE;
	timePress = 0;

	constructor()
	{
		super(API_MAZDA_ACTION_EXEC);
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
		return this._get(this, this.exec, MazdaAction.size, new BluetoothStruct(MazdaAction.struct));
	}
}
