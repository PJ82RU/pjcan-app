import { IScannerFrame } from "./IScannerFrame";
import { IBaseModel } from "@/models/pjcan/base";

export interface IScannerValue extends IBaseModel {
	count: number; // Количество кадров
	frames: IScannerFrame[]; // Массив кадров
}
