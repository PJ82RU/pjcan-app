import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ISW1Action } from "./ISW1Action";

export const API_SW1_ACTION_EXEC = 0x32;
export const API_SW1_ACTION_EVENT = "SW1Action";

/** Модель конфигурации кнопок */
export class SW1Action extends BaseModel implements ISW1Action
{
	static struct: any = {
		defaultMazda: BluetoothStruct.bit(),
		execMode: BluetoothStruct.bit()
	};
	static size: number = 1;

	defaultMazda = false;
	execMode = false;

	constructor(exec: number = API_SW1_ACTION_EXEC)
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
		return this._get(this, this.exec, SW1Action.size, new BluetoothStruct(SW1Action.struct));
	}
}
