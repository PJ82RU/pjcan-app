import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEWS_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_TEMPERATURE_VIEW_SIZE = API_VIEWS_SIZE;

/** Структура данных */
export const StructTemperatureView = {
	view: BluetoothStruct.struct(StructViewConfig)
};
