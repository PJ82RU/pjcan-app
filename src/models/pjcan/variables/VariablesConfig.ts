import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';
import { BoseConfig, IBoseConfig, StructBoseConfig } from './bose';
import { EngineConfig, IEngineConfig, StructEngineConfig } from './engine';
import { FuelConfig, IFuelConfig, StructFuelConfig } from './fuel';
import { VolumeConfig, IVolumeConfig, StructVolumeConfig } from './volume';

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
	bose: BluetoothStruct.struct(StructBoseConfig),
	engine: BluetoothStruct.struct(StructEngineConfig),
	fuel: BluetoothStruct.struct(StructFuelConfig),
	volume: BluetoothStruct.struct(StructVolumeConfig)
};

const struct = new BluetoothStruct(StructVariableConfig);

/** Модель конфигурации переменных */
export class VariableConfig extends BaseModel implements IVariableConfig {
	bose = new BoseConfig();
	engine = new EngineConfig();
	fuel = new FuelConfig();
	volume = new VolumeConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_CONFIG, STRUCT_LENGTH, struct);
	}
}
