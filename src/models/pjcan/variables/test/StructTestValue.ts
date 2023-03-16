import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

export const API_VARIABLE_TEST_SIZE = 36;

/** Структура данных */
export const StructTestValue = {
	text: BluetoothStruct.char(32),
	view: BluetoothStruct.struct(StructViewConfig)
};
