import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructVersion = {
	major: BluetoothStruct.uint8(),
	minor: BluetoothStruct.uint8(),
	build: BluetoothStruct.uint8(),
	revision: BluetoothStruct.uint8()
};
