import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_ENGINE_SIZE = 24;

/** Структура данных */
export const StructEngineValue = {
	enabled: BluetoothStruct.bit(),
	coolant: BluetoothStruct.int8(),
	rpm: BluetoothStruct.uint16(),
	mseconds: BluetoothStruct.uint32(),
	totalSeconds: BluetoothStruct.uint32(),
	totalCountRPM: BluetoothStruct.uint32(),
	countRPM: BluetoothStruct.uint32(),
	load: BluetoothStruct.uint16(),
	throttle: BluetoothStruct.uint16()
};
