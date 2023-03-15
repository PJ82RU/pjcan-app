import { BluetoothStruct } from "@/components/bluetooth";

export const API_DEVICE_SHA_SIZE = 32;
export const API_INFO_SIZE = 111 + API_DEVICE_SHA_SIZE;

/** Структура данных */
export const StructDeviceInfo = {
	chipCores: BluetoothStruct.uint8(),
	chipModel: BluetoothStruct.char(16),
	chipRevision: BluetoothStruct.uint8(),
	cpuFreqMHz: BluetoothStruct.uint32(),
	cycleCount: BluetoothStruct.uint32(),
	efuseMac: BluetoothStruct.uint64(),
	flashChipMode: BluetoothStruct.uint8(),
	flashChipSize: BluetoothStruct.uint32(),
	flashChipSpeed: BluetoothStruct.uint32(),
	freeHeap: BluetoothStruct.uint32(),
	freePsram: BluetoothStruct.uint32(),
	freeSketchSpace: BluetoothStruct.uint32(),
	heapSize: BluetoothStruct.uint32(),
	maxAllocHeap: BluetoothStruct.uint32(),
	maxAllocPsram: BluetoothStruct.uint32(),
	minFreeHeap: BluetoothStruct.uint32(),
	minFreePsram: BluetoothStruct.uint32(),
	psramSize: BluetoothStruct.uint32(),
	sdkVersion: BluetoothStruct.char(8),
	sketchMD5: BluetoothStruct.char(16),
	sketchSize: BluetoothStruct.uint32(),
	temperatureChip: BluetoothStruct.uint32(),
	sha: BluetoothStruct.uint8(API_DEVICE_SHA_SIZE)
};
