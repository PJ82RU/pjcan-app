// noinspection SpellCheckingInspection

import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

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
	sketchSize: BluetoothStruct.uint32()
};

const struct = new BluetoothStruct(StructDeviceInfo);

/** Модель характеристик устройства */
export class DeviceInfo extends BaseModel implements IDeviceInfo {
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
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_INFO, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_INFO, STRUCT_LENGTH, struct);
	}
}
