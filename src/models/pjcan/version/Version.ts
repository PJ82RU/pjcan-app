import { BluetoothStruct } from "@/components/bluetooth";
import { StructVersion } from "./StructVersion";
import { IVersion } from "./IVersion";

export const API_EXEC_VERSION = 0; // команда API
const STRUCT_LENGTH = 5; // длина данных API

const struct = new BluetoothStruct(StructVersion);

/** Модель версии */
export class Version implements IVersion
{
	major = 0;
	minor = 0;
	build = 0;
	revision = 0;

	/** Очистить данные */
	clear(): void
	{
		this.major = 0;
		this.minor = 0;
		this.build = 0;
		this.revision = 0;
	}

	/** Наличие версии */
	get is(): boolean
	{
		return this.major > 0;
	}

	/** Строковое представление */
	get toString(): string
	{
		return `${this.major}.${this.minor}.${this.build}.${this.revision}`;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): void
	{
		if (buf.getUint8(0) === API_EXEC_VERSION && buf.byteLength === STRUCT_LENGTH) struct.decode(buf, this, 1);
	}

	/**
	 * Сравнение версий
	 * @param {IVersion} ver Объект версии
	 */
	compare(ver: IVersion): number
	{
		const verA = [this.major, this.minor, this.build, this.revision];
		const verB = [ver.major, ver.minor, ver.build, ver.revision];

		for (let i = 0; i < 4; i++)
		{
			if (verB[i] > verA[i]) return 1;
			else if (verB[i] < verA[i]) return -1;
		}
		return 0;
	}
}
