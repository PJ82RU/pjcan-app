import { IBaseModel } from "../base";

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
