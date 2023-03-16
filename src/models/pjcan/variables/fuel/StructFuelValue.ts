import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_FUEL_SIZE = 12;

/** Структура данных */
export const StructFuelValue = {
	consumption: BluetoothStruct.uint32(),
	current: BluetoothStruct.uint16(),
	avg: BluetoothStruct.uint16(),
	total: BluetoothStruct.uint32()
};
