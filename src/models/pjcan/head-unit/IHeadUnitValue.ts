import { IBaseModel } from "../base";
import { IHeadUnitClock } from "@/models/pjcan/head-unit/IHeadUnitClock";

/** Интерфейс значения текста Head Unit */
export interface IHeadUnitValue extends IBaseModel {
	clock: IHeadUnitClock;	// Время ГУ
	button: number; // Кнопка ГУ (CLOCK = 16, HOUR = 17, MIN = 18)
	text: string; // Тест ГУ
}
