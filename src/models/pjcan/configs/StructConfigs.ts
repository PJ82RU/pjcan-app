import { BluetoothStruct } from "@/components/bluetooth";
import { StructButtonsConfig } from "../button";
import { StructCarConfig } from "../car";
import { StructTeyesConfig } from "../teyes";
import { StructVariableConfig } from "../variables/configs/VariablesConfig";

export const StructConfigs = {
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfig)
};
