import { BluetoothStruct } from "@/components/bluetooth";

export const API_SCANNER_CONFIG_SIZE = 2;

export const StructScannerConfig = {
	enabled: BluetoothStruct.bit(),
	addSend: BluetoothStruct.bit(),
	timeoutOff: BluetoothStruct.uint8()
};
