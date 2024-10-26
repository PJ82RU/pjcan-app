import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ISW3Action } from "./ISW3Action";

export const API_SW3_ACTION_EXEC = 0x3c;
export const API_SW3_ACTION_EVENT = "SW3Action";

/** Модель конфигурации кнопок */
export class SW3Action extends BaseModel implements ISW3Action
{
	static struct: any = {
		reset: BluetoothStruct.bit()
	};
	static size: number = 1;

	reset = false;

	constructor(exec: number = API_SW3_ACTION_EXEC)
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
		return this._get(this, this.exec, SW3Action.size, new BluetoothStruct(SW3Action.struct));
	}
}
