import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructClockValue = {
	hour: BluetoothStruct.uint8(),
	minutes: BluetoothStruct.uint8(),
	seconds: BluetoothStruct.uint8()
};
