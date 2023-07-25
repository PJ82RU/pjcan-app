import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { BoseConfig } from "../bose";
import { EngineConfig } from "../engine";
import { FuelConfig } from "../fuel";
import { VolumeConfig } from "../volume";
import { IVariableConfigs } from "./IVariableConfigs";
import { IVersion } from "../../version";

export const API_VARIABLE_CONFIGS_EXEC = 100;
export const API_VARIABLE_CONFIGS_EVENT = "VariableConfigs";

/** Модель конфигурации переменных */
export class VariableConfig extends BaseModel implements IVariableConfigs
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		EngineConfig.update(version);
		VolumeConfig.update(version);

		VariableConfig.struct = {
			bose: BluetoothStruct.struct(BoseConfig.struct),
			engine: BluetoothStruct.struct(EngineConfig.struct),
			fuel: BluetoothStruct.struct(FuelConfig.struct),
			volume: BluetoothStruct.struct(VolumeConfig.struct)
		};
		VariableConfig.size = BoseConfig.size + EngineConfig.size + FuelConfig.size + VolumeConfig.size;
	}

	bose = new BoseConfig();
	engine = new EngineConfig();
	fuel = new FuelConfig();
	volume = new VolumeConfig();

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
		const result = this._set(
			this,
			API_VARIABLE_CONFIGS_EXEC,
			VariableConfig.size + 1,
			new BluetoothStruct(VariableConfig.struct),
			buf
		);
		if (result)
		{
			this.bose.isData = true;
			this.engine.isData = true;
			this.fuel.isData = true;
			this.volume.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_CONFIGS_EXEC, 1);
	}
}
