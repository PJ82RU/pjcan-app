import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_VOLUME_CONFIG_SIZE = 3;

/** Структура данных */
export const StructVolumeConfig = {
	mute: BluetoothStruct.bit(),
	boseOnly: BluetoothStruct.bit(),
	volume: BluetoothStruct.uint8(),
	max: BluetoothStruct.uint8()
};
