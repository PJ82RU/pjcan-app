import EventEmitter from "eventemitter3";
import { EDeviceUpdateError } from "./EDeviceUpdateError";

/** Интерфейс загрузки данных прошивки */
export interface IDeviceUpdate extends EventEmitter {
	firmwareUrl: string; // Путь к файлу прошивки
	firmwareData: Uint8Array; // Данные прошивки
	offset: number; // Позиция чтения данных прошивки
	error: EDeviceUpdateError; // Код ошибки
	uploading: number; // Размер отправленных данных, в байтах

	encrypt: boolean; // Зашифрованные данные
	iv: boolean; // Данные IV
	ivData: Uint8Array; // Данные IV

	begin: boolean; // Начало прошивки
	end: boolean; // Завершение прошивки и перезагрузка
	abort: boolean; // Отмена прошивки
	total: number; // Размер прошивки, в байтах
	size: number; // Размер данных в пакете, в байтах

	clear: () => void;
	setIV: (res: string) => boolean;
	set: (buf: DataView) => void;
	get: () => DataView;
}
