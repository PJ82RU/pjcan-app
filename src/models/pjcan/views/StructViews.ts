import { BluetoothStruct } from "@/components/bluetooth";
import { StructCarView } from "../car";
import { StructTeyesView } from "../teyes";
import { StructVariableView } from "../variables/VariablesView";

export const StructViews = {
	car: BluetoothStruct.struct(StructCarView),
	teyes: BluetoothStruct.struct(StructTeyesView),
	variable: BluetoothStruct.struct(StructVariableView)
};
