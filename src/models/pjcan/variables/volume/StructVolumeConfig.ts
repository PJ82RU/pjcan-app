import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructVolumeConfig = {
	mute: BluetoothStruct.bit(),
	volume: BluetoothStruct.uint8(),
	max: BluetoothStruct.uint8()
};
