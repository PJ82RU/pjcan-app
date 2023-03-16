import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEWS_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_FUEL_VIEW_SIZE = API_VIEWS_SIZE * 4;

/** Структура данных */
export const StructFuelView = {
	consumption: BluetoothStruct.struct(StructViewConfig),
	current: BluetoothStruct.struct(StructViewConfig),
	avg: BluetoothStruct.struct(StructViewConfig),
	total: BluetoothStruct.struct(StructViewConfig)
};
