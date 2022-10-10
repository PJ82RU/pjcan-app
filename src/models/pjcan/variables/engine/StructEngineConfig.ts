import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructEngineConfig = {
	showDays: BluetoothStruct.bit(),
	totalSeconds: BluetoothStruct.uint32(),
	totalCountRPM: BluetoothStruct.uint32()
};
