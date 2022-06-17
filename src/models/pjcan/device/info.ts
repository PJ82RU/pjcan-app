import Struct from '@/components/bluetooth/struct';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_INFO = 5; // команда API
const STRUCT_LENGTH = 108; // длина данных API

/** Интерфейс характеристик устройства */
export interface IDeviceInfo extends IBaseModel {
	chipCores: number;
	chipModel: string;
	chipRevision: number;
	cpuFreqMHz: number;
	cycleCount: number;
	efuseMac: bigint;
	flashChipMode: number;
	flashChipSize: number;
	flashChipSpeed: number;
	freeHeap: number;
	freePsram: number;
	freeSketchSpace: number;
	heapSize: number;
	maxAllocHeap: number;
	maxAllocPsram: number;
	minFreeHeap: number;
	minFreePsram: number;
	psramSize: number;
	sdkVersion: string;
	sketchMD5: string;
	sketchSize: number;
}

/** Структура данных */
export const StructDeviceInfo = {
	chipCores: Struct.uint8(),
	chipModel: Struct.char(16),
	chipRevision: Struct.uint8(),
	cpuFreqMHz: Struct.uint32(),
	cycleCount: Struct.uint32(),
	efuseMac: Struct.uint64(),
	flashChipMode: Struct.uint8(),
	flashChipSize: Struct.uint32(),
	flashChipSpeed: Struct.uint32(),
	freeHeap: Struct.uint32(),
	freePsram: Struct.uint32(),
	freeSketchSpace: Struct.uint32(),
	heapSize: Struct.uint32(),
	maxAllocHeap: Struct.uint32(),
	maxAllocPsram: Struct.uint32(),
	minFreeHeap: Struct.uint32(),
	minFreePsram: Struct.uint32(),
	psramSize: Struct.uint32(),
	sdkVersion: Struct.char(8),
	sketchMD5: Struct.char(16),
	sketchSize: Struct.uint32()
};

const struct = new Struct(StructDeviceInfo);

/** Модель характеристик устройства */
export default class DeviceInfo extends BaseModel implements IDeviceInfo {
	chipCores = 0;
	chipModel = '';
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
	sdkVersion = '';
	sketchMD5 = '';
	sketchSize = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_INFO, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_INFO, STRUCT_LENGTH, struct);
	}
}
