import { BluetoothStruct } from "@/components/bluetooth";

export const API_VERSION_SIZE = 4;

/** Структура данных */
export const StructVersion = {
	major: BluetoothStruct.uint8(),
	minor: BluetoothStruct.uint8(),
	build: BluetoothStruct.uint8(),
	revision: BluetoothStruct.uint8()
};
