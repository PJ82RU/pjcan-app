import EventEmitter from 'eventemitter3';

export const API_EXEC_UPDATE_BEGIN_GZ = 93; // команда API
export const UPDATE_BEGIN_EVENT_RESULT = 'begin_result'; // Имя события

/** Интерфейс начала обновления прошивки устройства */
export interface IUpdateBegin extends EventEmitter {
	set: (buf: DataView) => void;
	get: () => DataView;
}

/** Модель начала обновления прошивки устройства */
export default class UpdateBegin extends EventEmitter implements IUpdateBegin {
	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): void {
		if (buf.getUint8(0) === API_EXEC_UPDATE_BEGIN_GZ && buf.byteLength === 2)
			this.emit(UPDATE_BEGIN_EVENT_RESULT, buf.getUint8(1) === 0);
	}

	/** Чтение данных */
	public get(): DataView {
		return new DataView(new Uint8Array([API_EXEC_UPDATE_BEGIN_GZ]).buffer);
	}
}
