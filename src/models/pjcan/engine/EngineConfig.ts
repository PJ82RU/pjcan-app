import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineConfig } from "./IEngineConfig";

export const API_ENGINE_CONFIG_EXEC = 0x90;
export const API_ENGINE_CONFIG_EVENT = "EngineConfig";

/** Модель конфигурации ДВС */
export class EngineConfig extends BaseModel implements IEngineConfig
{
	static struct: any = {
		showDays: BluetoothStruct.bit(),
		totalWorktime: BluetoothStruct.uint64(),
		totalCountRPM: BluetoothStruct.uint64()
	};
	static size: number = 17;

	showDays = false;
	totalWorktime = BigInt(0);
	totalCountRPM = BigInt(0);

	constructor(data?: DataView)
	{
		super(API_ENGINE_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, EngineConfig.size, new BluetoothStruct(EngineConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, EngineConfig.size, new BluetoothStruct(EngineConfig.struct));
	}
}
