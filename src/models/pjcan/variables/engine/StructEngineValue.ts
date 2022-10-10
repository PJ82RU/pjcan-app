import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructEngineValue = {
	enabled: BluetoothStruct.bit(),
	coolant: BluetoothStruct.uint8(),
	rpm: BluetoothStruct.uint16(),
	mseconds: BluetoothStruct.uint32(),
	countRPM: BluetoothStruct.float32(),
	load: BluetoothStruct.float32(),
	throttle: BluetoothStruct.float32()
};
