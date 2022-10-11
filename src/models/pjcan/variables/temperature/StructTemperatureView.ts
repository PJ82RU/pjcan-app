import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

/** Структура данных */
export const StructTemperatureView = {
	temperature: BluetoothStruct.struct(StructViewConfig)
};
