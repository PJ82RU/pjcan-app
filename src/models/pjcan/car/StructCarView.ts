import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../view/ViewConfig";

/** Структура данных */
export const StructCarView = {
	logo: BluetoothStruct.struct(StructViewConfig),
	hello: BluetoothStruct.struct(StructViewConfig)
};
