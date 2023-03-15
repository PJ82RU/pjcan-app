import { BluetoothStruct } from "@/components/bluetooth";

export const API_SCANNER_FRAME_SIZE = 22;

export const StructScannerFrame = {
	receive: BluetoothStruct.bit(),
	send: BluetoothStruct.bit(),
	id: BluetoothStruct.uint32(),
	data: BluetoothStruct.uint8(8),
	length: BluetoothStruct.uint8(),
	timestamp: BluetoothStruct.uint64()
};
