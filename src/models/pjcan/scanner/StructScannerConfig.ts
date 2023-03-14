import { BluetoothStruct } from "@/components/bluetooth";

export const StructScannerConfig = {
	enabled: BluetoothStruct.bit(),
	addSend: BluetoothStruct.bit(),
	timeout: BluetoothStruct.uint8()
};
