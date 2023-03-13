import { BluetoothStruct } from "@/components/bluetooth";

export const UPDATE_VALUE_DATA_SIZE = 496;

/** Структура данных */
export const StructUpdate = {
	begin: BluetoothStruct.bit(),
	end: BluetoothStruct.bit(),
	abort: BluetoothStruct.bit(),
	encrypt: BluetoothStruct.bit(),
	iv: BluetoothStruct.bit(),
	total: BluetoothStruct.uint32(),
	size: BluetoothStruct.uint16()
};
