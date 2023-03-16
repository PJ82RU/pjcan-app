import { BluetoothStruct } from "@/components/bluetooth";
import { API_VIEW_SIZE, StructViewConfig } from "../../view";

export const API_VARIABLE_MOVEMENT_VIEW_SIZE = API_VIEW_SIZE * 3;

/** Структура данных */
export const StructMovementView = {
	speed: BluetoothStruct.struct(StructViewConfig),
	speedAVG: BluetoothStruct.struct(StructViewConfig),
	restWay: BluetoothStruct.struct(StructViewConfig)
};
