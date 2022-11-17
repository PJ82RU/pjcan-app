import { BluetoothStruct } from "@/components/bluetooth";
import { StructButtonsConfig } from "../button";
import { StructCarConfig } from "../car";
import { StructTeyesConfig } from "../teyes";
import { StructVariableConfigs } from "../variables/configs";
import { StructVersion } from "../version";

export const StructConfigs = {
	version: BluetoothStruct.struct(StructVersion),
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
