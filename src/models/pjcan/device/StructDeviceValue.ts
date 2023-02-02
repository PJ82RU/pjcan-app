import { BluetoothStruct } from "@/components/bluetooth";

export const API_SIZE_DEVICE_SHA = 32;

/** Структура данных */
export const StructDeviceValue = {
	reboot: BluetoothStruct.bit(),
	resetConfig: BluetoothStruct.bit(),
	resetView: BluetoothStruct.bit(),
	activation: BluetoothStruct.bit(),
	save: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8(),
	sha: BluetoothStruct.uint8(API_SIZE_DEVICE_SHA),
	worktime: BluetoothStruct.uint64()
};
