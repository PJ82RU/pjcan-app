import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEWS_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_BOSE_VIEW_SIZE = API_VIEWS_SIZE;

/** Структура данных */
export const StructBoseView = {
	view: BluetoothStruct.struct(StructViewConfig)
};
