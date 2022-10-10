import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

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
