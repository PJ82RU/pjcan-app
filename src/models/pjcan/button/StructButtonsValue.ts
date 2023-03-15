import { BluetoothStruct } from "@/components/bluetooth";

export const API_BUTTONS_VALUE_SIZE = 6;

/** Структура данных */
export const StructButtonsValue = {
	index: BluetoothStruct.int8(),
	exec: BluetoothStruct.uint8(),
	count: BluetoothStruct.uint8(),
	type: BluetoothStruct.uint8(),
	r: BluetoothStruct.uint16()
};
