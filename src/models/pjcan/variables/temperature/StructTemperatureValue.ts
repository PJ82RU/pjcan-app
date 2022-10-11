import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructTemperatureValue = {
	in: BluetoothStruct.float32(),
	out: BluetoothStruct.float32()
};
