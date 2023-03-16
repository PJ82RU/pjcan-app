import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_SENSORS_VIEW_SIZE = API_VIEW_SIZE * 4;

/** Структура данных */
export const StructSensorsView = {
	handbrake: BluetoothStruct.struct(StructViewConfig),
	reverse: BluetoothStruct.struct(StructViewConfig),
	seatbelt: BluetoothStruct.struct(StructViewConfig),
	signal: BluetoothStruct.struct(StructViewConfig)
};
