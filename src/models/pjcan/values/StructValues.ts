import { BluetoothStruct } from "@/components/bluetooth";
import { API_DEVICE_VALUE_SIZE, StructDeviceValue } from "../device";
import { API_LCD_VALUE_SIZE, StructLCDValue } from "../lcd";
import { API_VARIABLE_VALUES_SIZE, StructVariablesValue } from "../variables/values";

export const API_VALUES_SIZE = API_DEVICE_VALUE_SIZE + API_LCD_VALUE_SIZE + API_VARIABLE_VALUES_SIZE;

export const StructValues = {
	device: BluetoothStruct.struct(StructDeviceValue),
	lcd: BluetoothStruct.struct(StructLCDValue),
	variable: BluetoothStruct.struct(StructVariablesValue)
};
