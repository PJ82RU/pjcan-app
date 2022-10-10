import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

/** Структура данных */
export const StructFuelView = {
	consumption: BluetoothStruct.struct(StructViewConfig),
	current: BluetoothStruct.struct(StructViewConfig),
	avg: BluetoothStruct.struct(StructViewConfig),
	total: BluetoothStruct.struct(StructViewConfig)
};
