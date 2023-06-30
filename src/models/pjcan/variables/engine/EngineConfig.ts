import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IEngineConfig } from "./IEngineConfig";
import { IVersion } from "../../version";

export const API_VARIABLE_ENGINE_CONFIG_EXEC = 141;
export const API_VARIABLE_ENGINE_CONFIG_EVENT = "VariableEngineConfig";

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
		if (!version || version.compareString("4.0.2") !== 1)
		{
			EngineConfig.struct = {
				showDays: BluetoothStruct.bit(),
				totalSeconds: BluetoothStruct.uint64(),
				totalCountRPM: BluetoothStruct.uint64()
			};
			EngineConfig.size = 17;
		}
		else
		{
			EngineConfig.struct = {
				showDays: BluetoothStruct.bit(),
				totalSeconds: BluetoothStruct.uint32(),
				totalCountRPM: BluetoothStruct.uint32()
			};
			EngineConfig.size = 9;
		}
	}

	showDays = false;
	totalSeconds = BigInt(0);
	totalCountRPM = BigInt(0);

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_ENGINE_CONFIG_EXEC,
			EngineConfig.size + 1,
			new BluetoothStruct(EngineConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_ENGINE_CONFIG_EXEC,
			EngineConfig.size + 1,
			new BluetoothStruct(EngineConfig.struct)
		);
	}
}
