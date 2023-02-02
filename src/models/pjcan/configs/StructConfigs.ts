import { BluetoothStruct } from "@/components/bluetooth";
import { StructVersion } from "@/models/pjcan/version";
import { StructDeviceConfig } from "@/models/pjcan/device";
import { StructButtonsConfig } from "../button";
import { StructCarConfig } from "../car";
import { StructTeyesConfig } from "../teyes";
import { StructVariableConfigs } from "../variables/configs";

export const StructConfigs = {
	version: BluetoothStruct.struct(StructVersion),
	device: BluetoothStruct.struct(StructDeviceConfig),
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
