import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructMovementValue = {
	speed: BluetoothStruct.uint32(),
	speedAVG: BluetoothStruct.uint16(),
	restWay: BluetoothStruct.uint32()
};
