import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_ENGINE_CONFIG_SIZE = 17;

/** Структура данных */
export const StructEngineConfig = {
	showDays: BluetoothStruct.bit(),
	totalSeconds: BluetoothStruct.uint64(),
	totalCountRPM: BluetoothStruct.uint64()
};
