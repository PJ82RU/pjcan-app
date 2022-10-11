import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "./view";

/** Структура данных */
export const StructSensorsView = {
	handbrake: BluetoothStruct.struct(StructViewConfig),
	reverse: BluetoothStruct.struct(StructViewConfig),
	seatbelt: BluetoothStruct.struct(StructViewConfig),
	signal: BluetoothStruct.struct(StructViewConfig)
};
