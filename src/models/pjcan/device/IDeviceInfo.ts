import { IBaseModel } from "../base";

/** Интерфейс характеристик устройства */
export interface IDeviceInfo extends IBaseModel {
	chipCores: number; // Количество ядер
	chipModel: string; // Модель чипа
	chipRevision: number; // Номер ревизии чипа
	cpuFreqMHz: number; // Частота ЦП, МГц
	cycleCount: number; // Количество циклов
	efuseMac: bigint; // MAC-адрес
	flashChipMode: number; // Режим флеш-памяти
	flashChipSize: number; // Размер флеш-памяти, байт
	flashChipSpeed: number; // Частота флеш-памяти
	freeHeap: number; // Свободной кучи в памяти
	freePsram: number; // Свободной SPI RAM
	freeSketchSpace: number; // Свободное место для прошивки
	heapSize: number; // Размер кучи в памяти
	maxAllocHeap: number; // Размер самого большого блока кучи
	maxAllocPsram: number; // Размер самого большого блока SPI RAM
	minFreeHeap: number; // Наименьший уровень свободной кучи
	minFreePsram: number; // Наименьший уровень свободной SPI RAM
	psramSize: number; // Размер SPI RAM
	sdkVersion: string; // Версия SDK
	sketchMD5: string; // MD5 прошивки
	sketchSize: number; // Размер прошивки
	temperatureChip: number; // Температура чипа (n/100)
	sha: number[]; // Хеш устройства
	hardware: string; // Версия платы
}
