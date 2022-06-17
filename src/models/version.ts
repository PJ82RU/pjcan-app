import Struct from '@/components/bluetooth/struct';

export const API_EXEC_VERSION = 0; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс версии */
export interface IVersion {
	major: number;
	minor: number;
	build: number;
	revision: number;
	is: boolean;
	toString: string;

	set: (buf: DataView) => void;
	compare: (ver: IVersion) => boolean;
}

/** Структура данных */
export const StructVersion = {
	major: Struct.uint8(),
	minor: Struct.uint8(),
	build: Struct.uint8(),
	revision: Struct.uint8()
};

const struct = new Struct(StructVersion);

/** Модель версии */
export class Version implements IVersion {
	major = 0;
	minor = 0;
	build = 0;
	revision = 0;

	/** Наличие версии */
	get is(): boolean {
		return this.major > 0;
	}

	/** Строковое представление */
	get toString(): string {
		return `${this.major}.${this.minor}.${this.build}.${this.revision}`;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): void {
		if (buf.getUint8(0) === API_EXEC_VERSION && buf.byteLength === STRUCT_LENGTH) struct.decode(buf, this, 1);
	}

	/**
	 * Сравнение версий
	 * @param {IVersion} ver Объект версии
	 */
	compare(ver: IVersion): boolean {
		return (
			ver.revision === this.revision &&
			ver.build === this.build &&
			ver.minor === this.minor &&
			ver.major === this.major
		);
	}
}
