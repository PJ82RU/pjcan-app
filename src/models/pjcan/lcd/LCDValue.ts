// noinspection SpellCheckingInspection

import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_LCD_VALUE = 40; // команда API
const STRUCT_LENGTH = 16; // длина данных API

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

/** Структура данных */
export const StructLCDValue = {
	icoCDIN: BluetoothStruct.bit(),
	icoMDIN: BluetoothStruct.bit(),
	icoST: BluetoothStruct.bit(),
	icoDOLBY: BluetoothStruct.bit(),
	icoRPT: BluetoothStruct.bit(),
	icoRDM: BluetoothStruct.bit(),
	icoAF: BluetoothStruct.bit(),
	icoPTY: BluetoothStruct.bit(),
	icoTA: BluetoothStruct.bit(),
	icoTP: BluetoothStruct.bit(),
	icoAUTOM: BluetoothStruct.bit(),
	charS1: BluetoothStruct.bit(),
	charS2: BluetoothStruct.bit(),
	charS3: BluetoothStruct.bit(),
	charS4: BluetoothStruct.bit(),
	btnChange: BluetoothStruct.bit(),
	btnInfo: BluetoothStruct.bit(),
	btnClock: BluetoothStruct.bit(),
	btnClockM: BluetoothStruct.bit(),
	btnClockH: BluetoothStruct.bit(),
	btnClockRM: BluetoothStruct.bit(),
	flgClock24: BluetoothStruct.bit(),
	buffer: BluetoothStruct.char(12)
};

const struct = new BluetoothStruct(StructLCDValue);

/** Модель значений LCD */
export class LCDValue extends BaseModel implements ILCDValue {
	icoCDIN = false;
	icoMDIN = false;
	icoST = false;
	icoDOLBY = false;
	icoRPT = false;
	icoRDM = false;
	icoAF = false;
	icoPTY = false;
	icoTA = false;
	icoTP = false;
	icoAUTOM = false;
	charS1 = false;
	charS2 = false;
	charS3 = false;
	charS4 = false;
	btnChange = false;
	btnInfo = false;
	btnClock = false;
	btnClockM = false;
	btnClockH = false;
	btnClockRM = false;
	flgClock24 = false;
	buffer = '';

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_LCD_VALUE, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_LCD_VALUE, STRUCT_LENGTH, struct);
	}
}
