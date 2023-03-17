import { IScannerFrame } from "./IScannerFrame";
import { IBaseModel } from "@/models/pjcan/base";

export interface IScannerValue extends IBaseModel {
	frames: IScannerFrame[]; // Массив кадров
	count: number; // Количество кадров
}
