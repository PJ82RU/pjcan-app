import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineAction } from "./IEngineAction";

export const API_ENGINE_ACTION_EXEC = 0x92;
export const API_ENGINE_ACTION_EVENT = "EngineAction";

/** Модель конфигурации ДВС */
export class EngineAction extends BaseModel implements IEngineAction
{
	static struct: any = {
		resetWorktime: BluetoothStruct.bit(),
		resetCountRPM: BluetoothStruct.bit()
	};
	static size: number = 1;

	resetWorktime = false;
	resetCountRPM = false;

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_ENGINE_ACTION_EXEC, EngineAction.size, new BluetoothStruct(EngineAction.struct));
	}
}
