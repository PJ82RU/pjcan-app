import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEWS_SIZE, StructViewConfig } from "../view";

export const API_TEYES_VIEW_SIZE = API_VIEWS_SIZE;

/** Структура данных */
export const StructTeyesView = {
	view: BluetoothStruct.struct(StructViewConfig)
};
