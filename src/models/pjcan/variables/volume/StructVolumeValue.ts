import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_VOLUME_SIZE = 2;

/** Структура данных */
export const StructVolumeValue = {
	mute: BluetoothStruct.bit(),
	volume: BluetoothStruct.uint8()
};
