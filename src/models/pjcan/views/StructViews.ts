import { BluetoothStruct } from "@/components/bluetooth";
import { API_CAR_VIEW_SIZE, StructCarView } from "../car";
import { API_TEYES_VIEW_SIZE, StructTeyesView } from "../teyes";
import { API_SIZE_VARIABLE_VIEW, StructVariableViews } from "../variables/views";

export const API_VIEW_SIZE = API_CAR_VIEW_SIZE + API_TEYES_VIEW_SIZE + API_SIZE_VARIABLE_VIEW;

export const StructViews = {
	car: BluetoothStruct.struct(StructCarView),
	teyes: BluetoothStruct.struct(StructTeyesView),
	variable: BluetoothStruct.struct(StructVariableViews)
};
