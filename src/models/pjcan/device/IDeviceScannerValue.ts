import { IDeviceScannerFrame } from "./IDeviceScannerFrame";
import { IBaseModel } from "@/models/pjcan/base";

export interface IDeviceScannerValue extends IBaseModel {
	count: number; // Количество кадров
	frames: IDeviceScannerFrame[]; // Массив кадров
}
