import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructCarConfig = {
	lcd: BluetoothStruct.bit(),
	carModel: BluetoothStruct.uint8(),
	logo: BluetoothStruct.char(13),
	hello: BluetoothStruct.char(33)
};
