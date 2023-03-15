import { BluetoothStruct } from "@/components/bluetooth";
import { API_SCANNER_FRAME_SIZE, StructScannerFrame } from "./StructScannerFrame";

export const API_SCANNER_FRAME_COUNT = 16;
export const API_SCANNER_VALUE_SIZE = API_SCANNER_FRAME_SIZE * API_SCANNER_FRAME_COUNT + 1;

export const StructScannerValue = {
	frames: BluetoothStruct.struct(StructScannerFrame, API_SCANNER_FRAME_COUNT),
	count: BluetoothStruct.uint8()
};
