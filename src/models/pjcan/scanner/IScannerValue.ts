import { IScannerFrame } from "./IScannerFrame";

export interface IScannerValue {
	frames: IScannerFrame[]; // Массив кадров
	count: number; // Количество кадров
}
