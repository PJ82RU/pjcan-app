import { BluetoothStruct } from "@/components/bluetooth";

export const API_DEVICE_SERIAL_SIZE = 64;
export const API_DEVICE_CONFIG_SIZE = API_DEVICE_SERIAL_SIZE;

/** Структура данных */
export const StructDeviceConfig = {
	serial: BluetoothStruct.char(API_DEVICE_SERIAL_SIZE)
};
