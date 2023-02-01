import { BluetoothStruct } from "@/components/bluetooth";

export const API_SIZE_DEVICE_SHA = 32;
export const API_SIZE_DEVICE_SERIAL = 64;

/** Структура данных */
export const StructDeviceConfig = {
	reboot: BluetoothStruct.bit(),
	resetConfig: BluetoothStruct.bit(),
	resetView: BluetoothStruct.bit(),
	activation: BluetoothStruct.bit(),
	save: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8(),
	sha: BluetoothStruct.uint8(API_SIZE_DEVICE_SHA),
	serial: BluetoothStruct.char(API_SIZE_DEVICE_SERIAL)
};
