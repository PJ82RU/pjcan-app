import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceInfo } from "./IDeviceInfo";

export const API_DEVICE_INFO_EXEC = 0x01;
export const API_DEVICE_INFO_EVENT = "DeviceInfo";

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
		sha: BluetoothStruct.uint8(32),
		hardware: BluetoothStruct.char(32)
	};
	static size: number = 175;

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
	hardware = "";

	constructor(data?: DataView)
	{
		super(API_DEVICE_INFO_EXEC);
		this.skipActivationCheck = true;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DeviceInfo.size, new BluetoothStruct(DeviceInfo.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
