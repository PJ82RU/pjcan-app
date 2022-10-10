import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructBoseConfig = {
	enabled: BluetoothStruct.bit(),
	audioPLT: BluetoothStruct.bit(),
	radioFM: BluetoothStruct.bit(),
	wow: BluetoothStruct.bit(),
	balance: BluetoothStruct.int8(),
	bass: BluetoothStruct.int8(),
	fade: BluetoothStruct.int8(),
	treble: BluetoothStruct.int8(),
	centerPoint: BluetoothStruct.uint8()
};
