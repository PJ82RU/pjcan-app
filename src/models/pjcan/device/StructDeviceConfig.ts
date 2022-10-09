import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructDeviceConfig = {
	reboot: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8()
};
