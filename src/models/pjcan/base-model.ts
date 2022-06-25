import { Struct } from '@/components/bluetooth/struct';

/** Базовый интерфейс */
export interface IBaseModel {
	set: (buf: DataView) => boolean;
	get: () => DataView | undefined;
}

/** Базовая модель */
export class BaseModel {
	/**
	 * Запись данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} len Длина данных API
	 * @param {Struct} struct Структура данных
	 * @param {DataView} buf Буффер данных
	 * @protected
	 */
	protected _set(th: any, exec: number, len: number, struct: Struct, buf: DataView): boolean {
		try {
			if (buf.getUint8(0) === exec && buf.byteLength === len) {
				struct.decode(buf, th, 1);
				return true;
			}
		} catch (e) {}
		return false;
	}

	/**
	 * Чтение данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} len Длина данных API
	 * @param {Struct} struct Структура данных
	 */
	protected _get(th: any, exec: number, len: number, struct: Struct): DataView | undefined {
		try {
			let buf: DataView = new DataView(new ArrayBuffer(len));
			struct.encode(buf, th, 1);
			buf.setUint8(0, exec);
			return buf;
		} catch (e) {}
	}
}
