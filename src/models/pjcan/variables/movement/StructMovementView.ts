import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

/** Структура данных */
export const StructMovementView = {
	speed: BluetoothStruct.struct(StructViewConfig),
	speedAVG: BluetoothStruct.struct(StructViewConfig),
	restWay: BluetoothStruct.struct(StructViewConfig)
};
