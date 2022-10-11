import { BluetoothStruct } from "@/components/bluetooth";
import { StructBoseConfig } from "../bose";
import { StructEngineConfig } from "../engine";
import { StructFuelConfig } from "../fuel";
import { StructVolumeConfig } from "../volume";

/** Структура данных */
export const StructVariableConfig = {
	bose: BluetoothStruct.struct(StructBoseConfig),
	engine: BluetoothStruct.struct(StructEngineConfig),
	fuel: BluetoothStruct.struct(StructFuelConfig),
	volume: BluetoothStruct.struct(StructVolumeConfig)
};
