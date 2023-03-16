import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_TEMPERATURE_SIZE = 4;

/** Структура данных */
export const StructTemperatureValue = {
	in: BluetoothStruct.uint16(),
	out: BluetoothStruct.uint16()
};
