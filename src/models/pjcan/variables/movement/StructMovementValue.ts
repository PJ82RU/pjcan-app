import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructMovementValue = {
	speed: BluetoothStruct.float32(),
	speedAVG: BluetoothStruct.float32(),
	restWay: BluetoothStruct.float32()
};
