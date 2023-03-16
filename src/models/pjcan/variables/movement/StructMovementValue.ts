import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_MOVEMENT_SIZE = 10;

/** Структура данных */
export const StructMovementValue = {
	speed: BluetoothStruct.uint32(),
	speedAVG: BluetoothStruct.uint16(),
	restWay: BluetoothStruct.uint32()
};
