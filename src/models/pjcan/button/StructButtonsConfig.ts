import { BluetoothStruct } from "@/components/bluetooth";
import { BUTTON_NUMBER, BUTTON_PRESS_TYPE_NUMBER } from "./ButtonConfig";

/** Структура данных */
export const StructButtonsConfig = {
	enabled: BluetoothStruct.bit(),
	out: BluetoothStruct.bit(),
	reset: BluetoothStruct.bit(),
	range: BluetoothStruct.uint8(),
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
