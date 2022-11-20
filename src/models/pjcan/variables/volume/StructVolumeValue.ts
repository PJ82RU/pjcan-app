import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructVolumeValue = {
	mute: BluetoothStruct.bit(),
	volume: BluetoothStruct.uint8()
};
