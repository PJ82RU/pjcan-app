import { BluetoothStruct } from "@/components/bluetooth";
import { API_VERSION_SIZE, StructVersion } from "@/models/pjcan/version";
import { API_DEVICE_CONFIG_SIZE, StructDeviceConfig } from "@/models/pjcan/device";
import { API_BUTTONS_CONFIG_SIZE, StructButtonsConfig } from "../button";
import { API_CAR_CONFIG_SIZE, StructCarConfig } from "../car";
import { API_TEYES_CONFIG_SIZE, StructTeyesConfig } from "../teyes";
import { API_VARIABLE_CONFIG_SIZE, StructVariableConfigs } from "../variables/configs";

export const API_CONFIG_SIZE =
	API_VERSION_SIZE +
	API_DEVICE_CONFIG_SIZE +
	API_BUTTONS_CONFIG_SIZE +
	API_CAR_CONFIG_SIZE +
	API_TEYES_CONFIG_SIZE +
	API_VARIABLE_CONFIG_SIZE;

export const StructConfigs = {
	version: BluetoothStruct.struct(StructVersion),
	device: BluetoothStruct.struct(StructDeviceConfig),
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfigs)
};
