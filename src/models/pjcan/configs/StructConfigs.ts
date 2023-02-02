import { BluetoothStruct } from "@/components/bluetooth";
import { StructDeviceConfig } from "@/models/pjcan/device";
import { StructButtonsConfig } from "../button";
import { StructCarConfig } from "../car";
import { StructTeyesConfig } from "../teyes";
import { StructVariableConfigs } from "../variables/configs";

export const StructConfigs = {
	device: BluetoothStruct.struct(StructDeviceConfig),
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
