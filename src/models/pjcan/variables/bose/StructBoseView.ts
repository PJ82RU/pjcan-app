import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_BOSE_VIEW_SIZE = API_VIEW_SIZE;

/** Структура данных */
export const StructBoseView = {
	view: BluetoothStruct.struct(StructViewConfig)
};
