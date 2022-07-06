import { BluetoothStruct } from '@/components/bluetooth';
import { Timeout } from '@/models/types';

/** Базовый интерфейс */
export interface IBaseModel {
	lastSend?: number;
	timeout?: Timeout;
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
	 * @param {BluetoothStruct} struct Структура данных
	 * @param {DataView} buf Буффер данных
	 * @protected
	 */
	protected _set(th: any, exec: number, len: number, struct: BluetoothStruct, buf: DataView): boolean {
		try {
			if (buf.getUint8(0) === exec && buf.byteLength === len) {
				struct.decode(buf, th, 1);
				return true;
			}
		} catch (e) {
			console.log(e);
		}
		return false;
	}

	/**
	 * Чтение данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} len Длина данных API
	 * @param {BluetoothStruct} struct Структура данных
	 */
	protected _get(th: any, exec: number, len: number, struct?: BluetoothStruct): DataView | undefined {
		try {
			let buf: DataView = new DataView(new ArrayBuffer(len));
			struct?.encode(buf, th, 1);
			buf.setUint8(0, exec);
			return buf;
		} catch (e) {
			console.log(e);
		}
	}
}
