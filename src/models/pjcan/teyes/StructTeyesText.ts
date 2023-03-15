import { BluetoothStruct } from "@/components/bluetooth";

export const API_TEYES_TEXT_SIZE = 12;

/** Структура данных */
export const StructTeyesText = {
	text: BluetoothStruct.char(API_TEYES_TEXT_SIZE)
};
