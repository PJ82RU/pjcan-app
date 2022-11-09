import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { BoseConfig } from "../bose";
import { EngineConfig } from "../engine";
import { FuelConfig } from "../fuel";
import { VolumeConfig } from "../volume";
import { StructVariableConfigs } from "./StructVariableConfigs";
import { IVariableConfigs } from "./IVariableConfigs";

export const API_EXEC_VARIABLE_CONFIG = 100; // команда API
const STRUCT_LENGTH = 23; // длина данных API

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
		const result = this._set(this, API_EXEC_VARIABLE_CONFIG, STRUCT_LENGTH, struct, buf);
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
