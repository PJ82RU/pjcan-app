import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructViewConfig = {
	enabled: BluetoothStruct.bit(),
	type: BluetoothStruct.uint8(),
	time: BluetoothStruct.uint16()
};
