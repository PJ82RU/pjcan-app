import { BluetoothStruct } from "@/components/bluetooth";
import { StructButtonsConfig } from "../button";
import { StructCarConfig } from "../car";
import { StructTeyesConfig } from "../teyes";
import { StructVariableConfigs } from "../variables/configs";

export const StructConfigs = {
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
