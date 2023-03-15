import { BluetoothStruct } from "@/components/bluetooth";

export const API_CAR_CONFIG_SIZE = 48;

/** Структура данных */
export const StructCarConfig = {
	lcd: BluetoothStruct.bit(),
	carModel: BluetoothStruct.uint8(),
	logo: BluetoothStruct.char(13),
	hello: BluetoothStruct.char(33)
};
