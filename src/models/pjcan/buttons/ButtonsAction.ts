import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonsAction } from "./IButtonsAction";

export const API_BUTTONS_SW1_ACTION_EXEC = 0x32;
export const API_BUTTONS_SW1_ACTION_EVENT = "ButtonsSW1Action";

export const API_BUTTONS_SW3_ACTION_EXEC = 0x3c;
export const API_BUTTONS_SW3_ACTION_EVENT = "ButtonsSW3Action";

/** Модель конфигурации кнопок */
export class ButtonsAction extends BaseModel implements IButtonsAction
{
	static struct: any = {
		empty: BluetoothStruct.bit(),
		defaultMazda3: BluetoothStruct.bit(),
		defaultMazdaCX7: BluetoothStruct.bit()
	};
	static size: number = 1;

	empty = false;
	defaultMazda3 = false;
	defaultMazdaCX7 = false;

	constructor(exec: number = API_BUTTONS_SW1_ACTION_EXEC)
	{
		super(exec);
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
		return this._get(this, this.exec, ButtonsAction.size, new BluetoothStruct(ButtonsAction.struct));
	}
}
