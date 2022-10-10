import { BluetoothStruct } from "@/components/bluetooth";
import { StructBoseConfig } from "@/models/pjcan/variables/bose";

/** Структура данных */
export const StructVariableConfig = {
	bose: BluetoothStruct.struct(StructBoseConfig),
	engine: BluetoothStruct.struct(StructEngineConfig),
	fuel: BluetoothStruct.struct(StructFuelConfig),
	volume: BluetoothStruct.struct(StructVolumeConfig)
};
