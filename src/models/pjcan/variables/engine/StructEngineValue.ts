import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_ENGINE_SIZE = 25;

/** Структура данных */
export const StructEngineValue = {
	enabled: BluetoothStruct.bit(),
	coolant: BluetoothStruct.int8(),
	rpm: BluetoothStruct.uint16(),
	worktime: BluetoothStruct.uint32(),
	countRPM: BluetoothStruct.uint32(),
	load: BluetoothStruct.uint16(),
	throttle: BluetoothStruct.uint16(),
	viewDays: BluetoothStruct.uint16(),
	viewHours: BluetoothStruct.uint8(),
	viewMinutes: BluetoothStruct.uint8(),
	viewSeconds: BluetoothStruct.uint8(),
	viewCountRPM: BluetoothStruct.uint32()
};
