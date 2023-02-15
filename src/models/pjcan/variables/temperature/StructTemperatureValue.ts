import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructTemperatureValue = {
	in: BluetoothStruct.uint16(),
	out: BluetoothStruct.uint16()
};
