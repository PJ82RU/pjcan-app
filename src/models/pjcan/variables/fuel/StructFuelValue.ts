import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructFuelValue = {
	consumption: BluetoothStruct.float32(),
	current: BluetoothStruct.float32(),
	avg: BluetoothStruct.float32(),
	total: BluetoothStruct.float32()
};
