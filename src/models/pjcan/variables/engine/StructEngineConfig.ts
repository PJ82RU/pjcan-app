import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_ENGINE_CONFIG_SIZE = 9;

/** Структура данных */
export const StructEngineConfig = {
	showDays: BluetoothStruct.bit(),
	totalSeconds: BluetoothStruct.uint32(),
	totalCountRPM: BluetoothStruct.uint32()
};
