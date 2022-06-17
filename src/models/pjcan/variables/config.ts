import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';
import BoseConfig, { IBoseConfig, StructBoseConfig } from '@/models/pjcan/variables/bose/config';
import EngineConfig, { IEngineConfig, StructEngineConfig } from '@/models/pjcan/variables/engine/config';
import FuelConfig, { IFuelConfig, StructFuelConfig } from '@/models/pjcan/variables/fuel/config';
import VolumeConfig, { IVolumeConfig, StructVolumeConfig } from '@/models/pjcan/variables/volume/config';

export const API_EXEC_VARIABLE_CONFIG = 100; // команда API
const STRUCT_LENGTH = 20; // длина данных API

/** Интерфейс конфигурации переменных */
export interface IVariableConfig extends IBaseModel {
	bose: IBoseConfig;
	engine: IEngineConfig;
	fuel: IFuelConfig;
	volume: IVolumeConfig;
}

/** Структура данных */
export const StructVariableConfig = {
	bose: Struct.struct(StructBoseConfig),
	engine: Struct.struct(StructEngineConfig),
	fuel: Struct.struct(StructFuelConfig),
	volume: Struct.struct(StructVolumeConfig)
};

const struct = new Struct(StructVariableConfig);

/** Модель конфигурации переменных */
export default class VariableConfig extends BaseModel implements IVariableConfig {
	bose = new BoseConfig();
	engine = new EngineConfig();
	fuel = new FuelConfig();
	volume = new VolumeConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_CONFIG, STRUCT_LENGTH, struct);
	}
}
