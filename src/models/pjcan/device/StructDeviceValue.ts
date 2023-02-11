import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructDeviceValue = {
	reboot: BluetoothStruct.bit(),
	resetConfig: BluetoothStruct.bit(),
	resetView: BluetoothStruct.bit(),
	activation: BluetoothStruct.bit(),
	save: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8(),
	worktime: BluetoothStruct.uint64()
};
