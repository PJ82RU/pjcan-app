import { BluetoothStruct } from "@/components/bluetooth";
import { StructVersion } from "@/models/pjcan/version";
import { StructDeviceValue } from "../device";
import { StructLCDValue } from "../lcd";
import { StructVariablesValue } from "../variables/values";

export const StructValues = {
	version: BluetoothStruct.struct(StructVersion),
	device: BluetoothStruct.struct(StructDeviceValue),
	lcd: BluetoothStruct.struct(StructLCDValue),
	variable: BluetoothStruct.struct(StructVariablesValue)
};
