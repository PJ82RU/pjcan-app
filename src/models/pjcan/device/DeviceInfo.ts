import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_INFO_SIZE, StructDeviceInfo } from "./StructDeviceInfo";
import { IDeviceInfo } from "./IDeviceInfo";

export const API_INFO_EXEC = 5;
export const API_INFO_EVENT = "Info";

const struct = new BluetoothStruct(StructDeviceInfo);

/** Модель характеристик устройства */
export class DeviceInfo extends BaseModel implements IDeviceInfo
{
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_INFO_EXEC, API_INFO_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_INFO_EXEC, 1);
	}
}
