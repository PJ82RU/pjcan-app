import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructClimateValue = {
	enabled: BluetoothStruct.bit(),
	automode: BluetoothStruct.bit(),
	ac: BluetoothStruct.bit(),
	airDLegs: BluetoothStruct.bit(),
	airDBody: BluetoothStruct.bit(),
	airDWindshield: BluetoothStruct.bit(),
	visible: BluetoothStruct.bit(),
	airRate: BluetoothStruct.uint8(),
	airType: BluetoothStruct.uint8(),
	tempType: BluetoothStruct.uint8(),
	tempDisplay: BluetoothStruct.uint8(),
	temperature: BluetoothStruct.float32()
};
