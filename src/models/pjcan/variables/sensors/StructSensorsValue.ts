import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_SENSORS_SIZE = 2;

/** Структура данных */
export const StructSensorsValue = {
	acc: BluetoothStruct.bit(),
	handbrake: BluetoothStruct.bit(),
	reverse: BluetoothStruct.bit(),
	seatbeltDriver: BluetoothStruct.bit(),
	seatbeltPassenger: BluetoothStruct.bit(),
	signal: BluetoothStruct.uint8()
};
