import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_CLOCK_SIZE = 3;
export const API_VARIABLE_CLOCK_VIEW_SIZE = 4;

/** Структура данных */
export const StructClockValue = {
	hour: BluetoothStruct.uint8(),
	minutes: BluetoothStruct.uint8(),
	seconds: BluetoothStruct.uint8()
};
