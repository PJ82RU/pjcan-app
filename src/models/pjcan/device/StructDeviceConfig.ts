import { BluetoothStruct } from "@/components/bluetooth";

export const API_SIZE_DEVICE_SERIAL = 64;

/** Структура данных */
export const StructDeviceConfig = {
	serial: BluetoothStruct.char(API_SIZE_DEVICE_SERIAL)
};
