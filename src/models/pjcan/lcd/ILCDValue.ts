import { IBaseModel } from "../base";

/** Интерфейс значений LCD */
export interface ILCDValue extends IBaseModel {
	icoCDIN: boolean; // CD IN (CD диск)
	icoMDIN: boolean; // MD IN (Мини диск)
	icoST: boolean; // ST (Стерео)
	icoDOLBY: boolean; // Dolby (Снижение уровня шума)
	icoRPT: boolean; // RPT (Повторное воспроизведение)
	icoRDM: boolean; // RDM (Случайное воспроизведение)
	icoAF: boolean; // AF (Альтернативная частота)
	icoPTY: boolean; // PTY (Информация о типе программы)
	icoTA: boolean; // TA (Сообщения о движении транспорта)
	icoTP: boolean; // TP (Сообщения о движении транспорта)
	icoAUTOM: boolean; // AUTO-M (Автоматическая запись в память)
	charS1: boolean; // Символ ":" между 3-м и 4-м символами
	charS2: boolean; // Символ "‘" между 11-м и 12-м символами
	charS3: boolean; // Символ "." между 11-м и 12-м символами
	charS4: boolean; // Символ "." между 10-м и 11-м символами
	btnChange: boolean; // Изменения при нажатии кнопок или вращающихся регуляторов
	btnInfo: boolean; // Кнопка Info
	btnClock: boolean; // Кнопка Clock
	btnClockM: boolean; // Кнопка M (в режиме установки времени)
	btnClockH: boolean; // Кнопка H (в режиме установки времени)
	btnClockRM: boolean; // Сброс минут в 0
	flgClock24: boolean; // true = 24 ч., false = 12 ч. формат времени (в режиме установки времени)
	buffer: string; // Буфер строки для отображения на LCD
}
