import { BluetoothStruct } from "@/components/bluetooth";

export const API_VIEWS_SIZE = 4;

/** Структура данных */
export const StructViewConfig = {
	enabled: BluetoothStruct.bit(),
	type: BluetoothStruct.uint8(),
	time: BluetoothStruct.uint16()
};
