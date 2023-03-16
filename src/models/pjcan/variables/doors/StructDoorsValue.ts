import { BluetoothStruct } from "@/components/bluetooth";

export const API_VARIABLE_DOORS_SIZE = 1;

/** Структура данных */
export const StructDoorsValue = {
	frontLeft: BluetoothStruct.bit(),
	frontRight: BluetoothStruct.bit(),
	backLeft: BluetoothStruct.bit(),
	backRight: BluetoothStruct.bit(),
	trunk: BluetoothStruct.bit()
};
