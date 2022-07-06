import BitSet from 'bitset';

/** Типы данных */
export enum ETypeValue {
	TYPE_BIT,
	TYPE_UINT8,
	TYPE_INT8,
	TYPE_UINT16,
	TYPE_INT16,
	TYPE_UINT32,
	TYPE_INT32,
	TYPE_FLOAT32,
	TYPE_UINT64,
	TYPE_INT64,
	TYPE_FLOAT64,
	TYPE_CHAR,
	TYPE_STRUCT
}

export interface ILooseObject {
	[key: string]: any;
}

/** Парсинг структуры данных С++ */
export class BluetoothStruct {
	/** Прямой порядок байтов */
	littleEndian: boolean = true;
	/** Смещение */
	private offset: number = 0;
	/** Буфер данных */
	private buffer: DataView | null = null;
	/** Смещение бит */
	private bit_offset: number = 0;
	/** Буфер бит данных */
	private bit_buffer: BitSet | null = null;
	/** Структура данных */
	readonly structData: ILooseObject;

	static bit(): any[] {
		return [ETypeValue.TYPE_BIT];
	}
	static uint8(length: number = 0): any[] {
		return [ETypeValue.TYPE_UINT8, length];
	}
	static int8(length: number = 0): any[] {
		return [ETypeValue.TYPE_INT8, length];
	}
	static uint16(length: number = 0): any[] {
		return [ETypeValue.TYPE_UINT16, length];
	}
	static int16(length: number = 0): any[] {
		return [ETypeValue.TYPE_INT16, length];
	}
	static uint32(length: number = 0): any[] {
		return [ETypeValue.TYPE_UINT32, length];
	}
	static int32(length: number = 0): any[] {
		return [ETypeValue.TYPE_INT32, length];
	}
	static float32(length: number = 0): any[] {
		return [ETypeValue.TYPE_FLOAT32, length];
	}
	static uint64(length: number = 0): any[] {
		return [ETypeValue.TYPE_UINT64, length];
	}
	static int64(length: number = 0): any[] {
		return [ETypeValue.TYPE_INT64, length];
	}
	static float64(length: number = 0): any[] {
		return [ETypeValue.TYPE_FLOAT64, length];
	}
	static char(length: number): any[] {
		return [ETypeValue.TYPE_CHAR, length];
	}
	static struct(data: ILooseObject, length: number = 0): any[] {
		return [ETypeValue.TYPE_STRUCT, data, length];
	}

	constructor(data: ILooseObject) {
		this.structData = data;
	}

	/** Очистить буфер */
	free(): void {
		this.offset = 0;
		this.buffer = null;
		this.bit_offset = 0;
		this.bit_buffer = null;
	}

	/** Очистить буфер бит */
	private freeBitBuffer(): void {
		this.bit_offset = 0;
		this.bit_buffer = null;
		this.offset++;
	}

	/** Чтение бита */
	getBit(): boolean {
		let result: boolean = false;
		if (this.buffer) {
			if (!this.bit_buffer) this.bit_buffer = new BitSet(this.buffer.getUint8(this.offset));
			result = this.bit_buffer.get(this.bit_offset++) === 1;
			if (this.bit_offset > 7) this.freeBitBuffer();
		}
		return result;
	}

	/**
	 * Запись бита
	 * @param val Значение
	 */
	setBit(val: boolean): void {
		if (this.buffer) {
			if (!this.bit_buffer) this.bit_buffer = new BitSet(this.buffer.getUint8(this.offset));
			//@ts-ignore
			this.buffer.setUint8(this.offset, this.bit_buffer.set(this.bit_offset++, val ? 1 : 0).data[0]);
			if (this.bit_offset > 7) this.freeBitBuffer();
		}
	}

	/**
	 * Чтение Int8
	 * @param u      UInt8
	 * @param length Количество значений массива
	 */
	getInt8(u: boolean, length: number): number[] {
		let result: number[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(u ? this.buffer.getUint8(this.offset++) : this.buffer.getInt8(this.offset++));
			}
		}
		return result;
	}

	/**
	 * Запись Int8
	 * @param u      UInt8
	 * @param val    Массив значений
	 * @param length Количество значений массива
	 */
	setInt8(u: boolean, val: number[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				if (u) this.buffer.setUint8(this.offset++, val[i]);
				else this.buffer.setInt8(this.offset++, val[i]);
			}
		}
	}

	/**
	 * Чтение Int16
	 * @param u      UInt16
	 * @param length Количество значений массива
	 */
	getInt16(u: boolean, length: number): number[] {
		let result: number[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(
					u
						? this.buffer.getUint16(this.offset, this.littleEndian)
						: this.buffer.getInt16(this.offset, this.littleEndian)
				);
				this.offset += 2;
			}
		}
		return result;
	}

	/**
	 * Запись Int16
	 * @param u      UInt16
	 * @param val    Значение
	 * @param length Количество значений массива
	 */
	setInt16(u: boolean, val: number[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				if (u) this.buffer.setUint16(this.offset, val[i], this.littleEndian);
				else this.buffer.setInt16(this.offset, val[i], this.littleEndian);
				this.offset += 2;
			}
		}
	}

	/**
	 * Чтение        Int32
	 * @param u      UInt32
	 * @param length Количество значений массива
	 */
	getInt32(u: boolean, length: number): number[] {
		let result: number[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(
					u
						? this.buffer.getUint32(this.offset, this.littleEndian)
						: this.buffer.getInt32(this.offset, this.littleEndian)
				);
				this.offset += 4;
			}
		}
		return result;
	}

	/**
	 * Запись Int32
	 * @param u      UInt32
	 * @param val    Значение
	 * @param length Количество значений массива
	 */
	setInt32(u: boolean, val: number[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				if (u) this.buffer.setUint32(this.offset, val[i], this.littleEndian);
				else this.buffer.setInt32(this.offset, val[i], this.littleEndian);
				this.offset += 4;
			}
		}
	}

	/**
	 * Чтение        Float32
	 * @param length Количество значений массива
	 */
	getFloat32(length: number): number[] {
		let result: number[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(this.buffer.getFloat32(this.offset, this.littleEndian));
				this.offset += 4;
			}
		}
		return result;
	}

	/**
	 * Запись Float32
	 * @param val    Значение
	 * @param length Количество значений массива
	 */
	setFloat32(val: number[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				this.buffer.setFloat32(this.offset, val[i], this.littleEndian);
				this.offset += 4;
			}
		}
	}

	/**
	 * Чтение Int64
	 * @param u      UInt64
	 * @param length Количество значений массива
	 */
	getInt64(u: boolean, length: number): bigint[] {
		let result: bigint[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(
					u
						? this.buffer.getBigUint64(this.offset, this.littleEndian)
						: this.buffer.getBigInt64(this.offset, this.littleEndian)
				);
				this.offset += 8;
			}
		}
		return result;
	}

	/**
	 * Запись Int64
	 * @param u      UInt64
	 * @param val    Значение
	 * @param length Количество значений массива
	 */
	setInt64(u: boolean, val: bigint[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				if (u) this.buffer.setBigUint64(this.offset, val[i], this.littleEndian);
				else this.buffer.setBigInt64(this.offset, val[i], this.littleEndian);
				this.offset += 8;
			}
		}
	}

	/**
	 * Чтение        Float64
	 * @param length Количество значений массива
	 */
	getFloat64(length: number): number[] {
		let result: number[] = [];
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				result.push(this.buffer.getFloat64(this.offset, this.littleEndian));
				this.offset += 8;
			}
		}
		return result;
	}

	/**
	 * Запись Float64
	 * @param val    Значение
	 * @param length Количество значений массива
	 */
	setFloat64(val: number[], length: number): void {
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				this.buffer.setFloat64(this.offset, val[i], this.littleEndian);
				this.offset += 8;
			}
		}
	}

	/**
	 * Чтение строки
	 * @param length Длина строки
	 */
	getChars(length: number): string {
		let result: string = '';
		if (this.buffer) {
			for (let i = 0; i < length; i++) {
				const byte = this.buffer.getUint8(this.offset++);
				if (byte > 19 && byte < 127) result += String.fromCharCode(byte);
			}
		}
		return result;
	}

	/**
	 * Запись строки
	 * @param str    Строка
	 * @param length Длина копирования
	 */
	setChars(str: string, length: number): void {
		if (this.buffer) {
			// noinspection SpellCheckingInspection
			const lenstr = str.length;
			for (let i = 0; i < length; i++) this.buffer.setInt8(this.offset++, i < lenstr ? str.charCodeAt(i) : 0);
		}
	}

	/**
	 * Декодировать значения
	 * @param buffer Буфер данных
	 * @param data   Структура для данных
	 * @param offset Начало смещения
	 */
	decode(buffer: DataView, data: ILooseObject, offset: number = 0): number {
		this.buffer = buffer;
		this.offset = offset;

		for (const [key, value] of Object.entries(this.structData)) {
			if (value[0] != ETypeValue.TYPE_BIT) {
				if (this.bit_offset > 0) this.freeBitBuffer();

				switch (value[0] as ETypeValue) {
					case ETypeValue.TYPE_UINT8:
						if (value[1] > 0) data[key] = this.getInt8(true, value[1]);
						else data[key] = this.getInt8(true, 1)[0];
						break;

					case ETypeValue.TYPE_INT8:
						if (value[1] > 0) data[key] = this.getInt8(false, value[1]);
						else data[key] = this.getInt8(false, 1)[0];
						break;

					case ETypeValue.TYPE_UINT16:
						if (value[1] > 0) data[key] = this.getInt16(true, value[1]);
						else data[key] = this.getInt16(true, 1)[0];
						break;

					case ETypeValue.TYPE_INT16:
						if (value[1] > 0) data[key] = this.getInt16(false, value[1]);
						else data[key] = this.getInt16(false, 1)[0];
						break;

					case ETypeValue.TYPE_UINT32:
						if (value[1] > 0) data[key] = this.getInt32(true, value[1]);
						else data[key] = this.getInt32(true, 1)[0];
						break;

					case ETypeValue.TYPE_INT32:
						if (value[1] > 0) data[key] = this.getInt32(false, value[1]);
						else data[key] = this.getInt32(false, 1)[0];
						break;

					case ETypeValue.TYPE_FLOAT32:
						if (value[1] > 0) data[key] = this.getFloat32(value[1]);
						else data[key] = this.getFloat32(1)[0];
						break;

					case ETypeValue.TYPE_UINT64:
						if (value[1] > 0) data[key] = this.getInt64(true, value[1]);
						else data[key] = this.getInt64(true, 1)[0];
						break;

					case ETypeValue.TYPE_INT64:
						if (value[1] > 0) data[key] = this.getInt64(false, value[1]);
						else data[key] = this.getInt64(false, 1)[0];
						break;

					case ETypeValue.TYPE_FLOAT64:
						if (value[1] > 0) data[key] = this.getFloat64(value[1]);
						else data[key] = this.getFloat64(1)[0];
						break;

					case ETypeValue.TYPE_CHAR:
						data[key] = this.getChars(value[1]);
						break;

					case ETypeValue.TYPE_STRUCT:
						if (value[2] > 0) {
							for (let i = 0; i < value[2]; i++)
								this.offset = new BluetoothStruct(value[1]).decode(buffer, data[key][i], this.offset);
						} else this.offset = new BluetoothStruct(value[1]).decode(buffer, data[key], this.offset);
						break;
				}
			} else data[key] = this.getBit();
		}
		return this.offset;
	}

	/**
	 * Кодировать значения
	 * @param buffer Буфер данных
	 * @param data   Структура для данных
	 * @param offset Начало смещения
	 */
	encode(buffer: DataView, data: ILooseObject, offset: number = 0): number {
		this.buffer = buffer;
		this.offset = offset;

		for (const [key, value] of Object.entries(this.structData)) {
			if (data[key] !== undefined)
				if (value[0] != ETypeValue.TYPE_BIT) {
					if (this.bit_offset > 0) this.freeBitBuffer();

					switch (value[0] as ETypeValue) {
						case ETypeValue.TYPE_UINT8:
							if (value[1] > 0) this.setInt8(true, data[key], value[1]);
							else this.setInt8(true, [data[key]], 1);
							break;

						case ETypeValue.TYPE_INT8:
							if (value[1] > 0) this.setInt8(false, data[key], value[1]);
							else this.setInt8(false, [data[key]], 1);
							break;

						case ETypeValue.TYPE_UINT16:
							if (value[1] > 0) this.setInt16(true, data[key], value[1]);
							else this.setInt16(true, [data[key]], 1);
							break;

						case ETypeValue.TYPE_INT16:
							if (value[1] > 0) this.setInt16(false, data[key], value[1]);
							else this.setInt16(false, [data[key]], 1);
							break;

						case ETypeValue.TYPE_UINT32:
							if (value[1] > 0) this.setInt32(true, data[key], value[1]);
							else this.setInt32(true, [data[key]], 1);
							break;

						case ETypeValue.TYPE_INT32:
							if (value[1] > 0) this.setInt32(false, data[key], value[1]);
							else this.setInt32(false, [data[key]], 1);
							break;

						case ETypeValue.TYPE_FLOAT32:
							if (value[1] > 0) this.setFloat32(data[key], value[1]);
							else this.setFloat32([data[key]], 1);
							break;

						case ETypeValue.TYPE_UINT64:
							if (value[1] > 0) this.setInt64(true, data[key], value[1]);
							else this.setInt64(true, [data[key]], 1);
							break;

						case ETypeValue.TYPE_INT64:
							if (value[1] > 0) this.setInt64(false, data[key], value[1]);
							else this.setInt64(false, [data[key]], 1);
							break;

						case ETypeValue.TYPE_FLOAT64:
							if (value[1] > 0) this.setFloat64(data[key], value[1]);
							else this.setFloat64([data[key]], 1);
							break;

						case ETypeValue.TYPE_CHAR:
							this.setChars(data[key], value[1]);
							break;

						case ETypeValue.TYPE_STRUCT:
							if (value[2] > 0) {
								for (let i = 0; i < value[2]; i++)
									this.offset = new BluetoothStruct(value[1]).encode(
										buffer,
										data[key][i],
										this.offset
									);
							} else this.offset = new BluetoothStruct(value[1]).encode(buffer, data[key], this.offset);
					}
				} else this.setBit(data[key]);
		}
		return this.offset;
	}
}
