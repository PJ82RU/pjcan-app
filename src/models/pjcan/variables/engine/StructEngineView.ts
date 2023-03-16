import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_ENGINE_VIEW_SIZE = API_VIEW_SIZE * 7;

/** Структура данных */
export const StructEngineView = {
	enabled: BluetoothStruct.struct(StructViewConfig),
	totalSeconds: BluetoothStruct.struct(StructViewConfig),
	totalCountRPM: BluetoothStruct.struct(StructViewConfig),
	coolant: BluetoothStruct.struct(StructViewConfig),
	rpm: BluetoothStruct.struct(StructViewConfig),
	load: BluetoothStruct.struct(StructViewConfig),
	throttle: BluetoothStruct.struct(StructViewConfig)
};
