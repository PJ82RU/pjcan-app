import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructDeviceConfig = {
	reboot: BluetoothStruct.bit(),
	resetConfig: BluetoothStruct.bit(),
	resetView: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8()
};
