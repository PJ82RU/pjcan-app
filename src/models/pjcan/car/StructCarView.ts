import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, StructViewConfig } from "../view";

export const API_CAR_VIEW_SIZE = API_VIEW_SIZE * 2;

/** Структура данных */
export const StructCarView = {
	logo: BluetoothStruct.struct(StructViewConfig),
	hello: BluetoothStruct.struct(StructViewConfig)
};
