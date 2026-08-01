import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IEngineConfig } from "./IEngineConfig";
import { IVersion } from "@/models/pjcan/version";

export const API_ENGINE_CONFIG_EXEC = 0x90;
export const API_ENGINE_CONFIG_EVENT = "EngineConfig";

/** Модель конфигурации ДВС */
export class EngineConfig extends BaseModel implements IEngineConfig
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
			EngineConfig.struct = {
				showDays: BluetoothStruct.bit(),
				totalWorktime: BluetoothStruct.uint64(),
				totalCountRPM: BluetoothStruct.uint64(),
				oilDurationSec: BluetoothStruct.uint32(),
				oilDistanceMeters: BluetoothStruct.uint32(),
				oilHoursLimit: BluetoothStruct.uint16()
			};
			EngineConfig.size = 27;
		}
		else
		{
			EngineConfig.struct = {
				showDays: BluetoothStruct.bit(),
				totalWorktime: BluetoothStruct.uint64(),
				totalCountRPM: BluetoothStruct.uint64()
			};
			EngineConfig.size = 17;
		}
	}

	showDays = false;
	totalWorktime = BigInt(0);
	totalCountRPM = BigInt(0);
	oilDurationSec = 0;
	oilDistanceMeters = 0;
	oilHoursLimit = 0;

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
