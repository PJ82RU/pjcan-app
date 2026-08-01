import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineAction } from "./IEngineAction";
import { IVersion } from "@/models/pjcan/version";

export const API_ENGINE_ACTION_EXEC = 0x92;
export const API_ENGINE_ACTION_EVENT = "EngineAction";

/** Модель конфигурации ДВС */
export class EngineAction extends BaseModel implements IEngineAction
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (version && (version.major > 4 || (version.major === 4 && version.minor >= 2)))
		{
			EngineAction.struct = {
				resetWorktime: BluetoothStruct.bit(),
				resetCountRPM: BluetoothStruct.bit(),
				resetOilLife: BluetoothStruct.bit()
			};
			EngineAction.size = 1;
		}
		else
		{
			EngineAction.struct = {
				resetWorktime: BluetoothStruct.bit(),
				resetCountRPM: BluetoothStruct.bit()
			};
			EngineAction.size = 1;
		}
	}

	resetWorktime = false;
	resetCountRPM = false;
	resetOilLife = false;

	constructor()
	{
		super(API_ENGINE_ACTION_EXEC);
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
		return this._get(this, this.exec, EngineAction.size, new BluetoothStruct(EngineAction.struct));
	}
}
