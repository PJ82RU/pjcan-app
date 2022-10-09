import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructButtonsValue = {
	index: BluetoothStruct.int8(),
	exec: BluetoothStruct.uint8(),
	count: BluetoothStruct.uint8(),
	type: BluetoothStruct.uint8(),
	r: BluetoothStruct.uint16()
};
