import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VARIABLE_BOSE, BoseConfig } from "../bose";
import { API_SIZE_VARIABLE_ENGINE_CONFIG, EngineConfig } from "../engine";
import { API_SIZE_VARIABLE_FUEL_CONFIG, FuelConfig } from "../fuel";
import { API_SIZE_VARIABLE_VOLUME_CONFIG, VolumeConfig } from "../volume";
import { StructVariableConfigs } from "./StructVariableConfigs";
import { IVariableConfigs } from "./IVariableConfigs";

export const API_EXEC_VARIABLE_CONFIG = 100;
export const API_SIZE_VARIABLE_CONFIG =
	API_SIZE_VARIABLE_BOSE +
	API_SIZE_VARIABLE_ENGINE_CONFIG +
	API_SIZE_VARIABLE_FUEL_CONFIG +
	API_SIZE_VARIABLE_VOLUME_CONFIG;

const struct = new BluetoothStruct(StructVariableConfigs);

/** Модель конфигурации переменных */
export class VariableConfig extends BaseModel implements IVariableConfigs
{
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(this, API_EXEC_VARIABLE_CONFIG, API_SIZE_VARIABLE_CONFIG + 1, struct, buf);
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
		return this._get(this, API_EXEC_VARIABLE_CONFIG, 1);
	}
}
