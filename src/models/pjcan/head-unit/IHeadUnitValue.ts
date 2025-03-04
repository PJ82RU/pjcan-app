import { IBaseModel } from "../base";
import { IHeadUnitClock } from "@/models/pjcan/head-unit/IHeadUnitClock";

/** Интерфейс значения текста Head Unit */
export interface IHeadUnitValue extends IBaseModel {
	clock: IHeadUnitClock;	// Время ГУ
	button: number; // Кнопка ГУ (CLOCK = 16, HOUR = 17, MIN = 18)
	text: string; // Тест ГУ
	ico_af?: boolean; // AF (Радио)
	ico_rdm?: boolean; // RDM (Случайное воспроизведение)
	ico_rpt?: boolean; // RPT (Повторное воспроизведение)
	ico_cd_in?: boolean; // CD IN (USB или BT)
	char_s4?: boolean; // Символ "." между 10-м и 11-м символами
	char_s3?: boolean; // Символ "." между 11-м и 12-м символами
	char_s2?: boolean; // Символ "‘" между 11-м и 12-м символами
	char_s1?: boolean; // Символ ":" между 3-м и 4-м символами
}
