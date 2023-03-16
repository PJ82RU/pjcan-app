import { BluetoothStruct } from "@/components/bluetooth";
import { API_CAR_VIEW_SIZE, StructCarView } from "../car";
import { API_TEYES_VIEW_SIZE, StructTeyesView } from "../teyes";
import { API_VARIABLE_VIEWS_SIZE, StructVariableViews } from "../variables/views";

export const API_VIEWS_SIZE = API_CAR_VIEW_SIZE + API_TEYES_VIEW_SIZE + API_VARIABLE_VIEWS_SIZE;

export const StructViews = {
	car: BluetoothStruct.struct(StructCarView),
	teyes: BluetoothStruct.struct(StructTeyesView),
	variable: BluetoothStruct.struct(StructVariableViews)
};
