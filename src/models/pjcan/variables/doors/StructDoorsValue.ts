import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructDoorsValue = {
	frontLeft: BluetoothStruct.bit(),
	frontRight: BluetoothStruct.bit(),
	backLeft: BluetoothStruct.bit(),
	backRight: BluetoothStruct.bit(),
	trunk: BluetoothStruct.bit()
};
