import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceInfo } from "./IDeviceInfo";

export const API_INFO_EXEC = 5;
export const API_INFO_EVENT = "Info";
export const API_DEVICE_SHA_SIZE = 32;

/** Модель характеристик устройства */
export class DeviceInfo extends BaseModel implements IDeviceInfo
{
	static struct: any = {
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
	static size: number = 111 + API_DEVICE_SHA_SIZE;

	chipCores = 0;
	chipModel = "";
	chipRevision = 0;
	cpuFreqMHz = 0;
	cycleCount = 0;
	efuseMac = BigInt(0);
	flashChipMode = 0;
	flashChipSize = 0;
	flashChipSpeed = 0;
	freeHeap = 0;
	freePsram = 0;
	freeSketchSpace = 0;
	heapSize = 0;
	maxAllocHeap = 0;
	maxAllocPsram = 0;
	minFreeHeap = 0;
	minFreePsram = 0;
	psramSize = 0;
	sdkVersion = "";
	sketchMD5 = "";
	sketchSize = 0;
	temperatureChip = 0;
	sha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_INFO_EXEC, DeviceInfo.size + 1, new BluetoothStruct(DeviceInfo.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_INFO_EXEC, 1);
	}
}
