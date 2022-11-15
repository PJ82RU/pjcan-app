import { BluetoothStruct } from "@/components/bluetooth";
import { StructDeviceValue } from "../device";
import { StructLCDValue } from "../lcd";
import { StructVariablesValue } from "../variables/values";

export const StructValues = {
	device: BluetoothStruct.struct(StructDeviceValue),
	lcd: BluetoothStruct.struct(StructLCDValue),
	variable: BluetoothStruct.struct(StructVariablesValue)
};
