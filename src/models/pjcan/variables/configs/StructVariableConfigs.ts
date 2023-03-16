import { BluetoothStruct } from "@/components/bluetooth";
import { API_VARIABLE_BOSE_SIZE, StructBoseConfig } from "../bose";
import { API_VARIABLE_ENGINE_CONFIG_SIZE, StructEngineConfig } from "../engine";
import { API_VARIABLE_FUEL_CONFIG_SIZE, StructFuelConfig } from "../fuel";
import { API_VARIABLE_VOLUME_CONFIG_SIZE, StructVolumeConfig } from "../volume";

export const API_VARIABLE_CONFIGS_SIZE =
	API_VARIABLE_BOSE_SIZE +
	API_VARIABLE_ENGINE_CONFIG_SIZE +
	API_VARIABLE_FUEL_CONFIG_SIZE +
	API_VARIABLE_VOLUME_CONFIG_SIZE;

/** Структура данных */
export const StructVariableConfigs = {
	bose: BluetoothStruct.struct(StructBoseConfig),
	engine: BluetoothStruct.struct(StructEngineConfig),
	fuel: BluetoothStruct.struct(StructFuelConfig),
	volume: BluetoothStruct.struct(StructVolumeConfig)
};
