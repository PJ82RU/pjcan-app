import EventEmitter from 'eventemitter3';

export const API_EXEC_UPDATE_UPLOAD_GZFILE = 92; // команда API
export const UPDATE_UPLOAD_EVENT_RESULT = 'upload_result'; // Имя события
const STRUCT_LENGTH = 512; // длина данных API

/** Интерфейс загрузки данных прошивки */
export interface IUpdateData extends EventEmitter {
	data: Uint8Array;
	offset: number;

	clear: () => void;
	set: (buf: DataView) => void;
	get: () => DataView;
}

/** Модель загрузки данных прошивки */
export class UpdateData extends EventEmitter implements IUpdateData {
	data = new Uint8Array(0);
	offset = 0;

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/** Очистить данные */
	clear(): void {
		this.data = new Uint8Array(0);
		this.offset = 0;
	}
	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): void {
		if (buf.getUint8(0) === API_EXEC_UPDATE_UPLOAD_GZFILE && buf.byteLength === 2)
			this.emit(UPDATE_UPLOAD_EVENT_RESULT, buf.getUint8(1) === 0);
	}

	/** Чтение данных */
	get(): DataView {
		let size = this.data.byteLength - this.offset;
		if (size < 0) size = 0;
		else if (size > STRUCT_LENGTH - 1) size = STRUCT_LENGTH - 1;

		let buf: Uint8Array = new Uint8Array(size + 1);
		buf[0] = API_EXEC_UPDATE_UPLOAD_GZFILE;
		for (let i = 0; i < size; i++) {
			buf[i + 1] = this.data[this.offset];
			this.offset++;
		}
		return new DataView(buf.buffer);
	}
}
