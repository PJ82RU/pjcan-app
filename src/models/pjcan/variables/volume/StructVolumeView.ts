import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";

export const API_VARIABLE_VOLUME_VIEW_SIZE = 4;

/** Структура данных */
export const StructVolumeView = {
	view: BluetoothStruct.struct(StructViewConfig)
};
