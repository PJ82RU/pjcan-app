import { BluetoothStruct } from "@/components/bluetooth";
import { API_SIZE_VERSION, StructVersion } from "@/models/pjcan/version";
import { API_DEVICE_CONFIG_SIZE, StructDeviceConfig } from "@/models/pjcan/device";
import { API_BUTTONS_CONFIG_SIZE, StructButtonsConfig } from "../button";
import { API_CAR_CONFIG_SIZE, StructCarConfig } from "../car";
import { API_SIZE_TEYES_CONFIG, StructTeyesConfig } from "../teyes";
import { API_SIZE_VARIABLE_CONFIG, StructVariableConfigs } from "../variables/configs";

export const API_CONFIG_SIZE =
	API_SIZE_VERSION +
	API_DEVICE_CONFIG_SIZE +
	API_BUTTONS_CONFIG_SIZE +
	API_CAR_CONFIG_SIZE +
	API_SIZE_TEYES_CONFIG +
	API_SIZE_VARIABLE_CONFIG;

export const StructConfigs = {
	version: BluetoothStruct.struct(StructVersion),
	device: BluetoothStruct.struct(StructDeviceConfig),
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
