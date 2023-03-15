import { BluetoothStruct } from "@/components/bluetooth";
import { API_DEVICE_VALUE_SIZE, StructDeviceValue } from "../device";
import { API_LCD_VALUE_SIZE, StructLCDValue } from "../lcd";
import { API_SIZE_VARIABLE_VALUE, StructVariablesValue } from "../variables/values";

export const API_VALUE_SIZE = API_DEVICE_VALUE_SIZE + API_LCD_VALUE_SIZE + API_SIZE_VARIABLE_VALUE;

export const StructValues = {
	device: BluetoothStruct.struct(StructDeviceValue),
	lcd: BluetoothStruct.struct(StructLCDValue),
	variable: BluetoothStruct.struct(StructVariablesValue)
};
