import { BluetoothStruct } from "@/components/bluetooth";

export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

/** Структура данных */
export const StructButtonsConfig = {
	enabled: BluetoothStruct.bit(),
	out: BluetoothStruct.bit(),
	reset: BluetoothStruct.bit(),
	sendValue: BluetoothStruct.bit(),
	range: BluetoothStruct.uint16(),
	items: BluetoothStruct.struct(
		{
			hold: BluetoothStruct.uint8(),
			inR: BluetoothStruct.uint16(),
			outR: BluetoothStruct.uint16(),
			exec: BluetoothStruct.uint8(BUTTON_PRESS_TYPE_NUMBER)
		},
		BUTTON_NUMBER
	)
};
