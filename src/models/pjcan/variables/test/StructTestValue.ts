import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

/** Структура данных */
export const StructTestValue = {
	text: BluetoothStruct.char(32),
	view: BluetoothStruct.struct(StructViewConfig)
};
