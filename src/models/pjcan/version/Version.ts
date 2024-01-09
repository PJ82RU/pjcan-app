import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVersion } from "./IVersion";

export const API_VERSION_EXEC = 0x00;
export const API_VERSION_EVENT = "Version";

/** Модель версии */
export class Version extends BaseModel implements IVersion
{
	static struct: any = {
		major: BluetoothStruct.uint8(),
		minor: BluetoothStruct.uint8(),
		build: BluetoothStruct.uint8(),
		revision: BluetoothStruct.uint8()
	};
	static size: number = 4;

	major = 0;
	minor = 0;
	build = 0;
	revision = 0;

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

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Сравнение версий
	 * @param {IVersion} ver Объект версии
	 * @param {number} len Длина сравниваемой версии (от 1 до 4)
	 */
	compare(ver: IVersion, len: number): number
	{
		const verA = [this.major, this.minor, this.build, this.revision];
		const verB = [ver.major, ver.minor, ver.build, ver.revision];
		if (len < 1) len = 1;
		else if (len > 4) len = 4;

		for (let i = 0; i < len; i++)
		{
			if (verB[i] > verA[i]) return 1;
			else if (verB[i] < verA[i]) return -1;
		}
		return 0;
	}

	compareString(ver: string): number
	{
		if (ver?.length > 0)
		{
			const verA = [this.major, this.minor, this.build, this.revision];
			const verB = ver.split(".")?.map(x => parseInt(x));

			if (verB?.length > 0)
			{
				let len = verB.length;
				if (len > 4) len = 4;

				for (let i = 0; i < len; i++)
				{
					if (verB[i] > verA[i]) return 1;
					else if (verB[i] < verA[i]) return -1;
				}
			}
		}
		return 0;
	}

	/** Очистить значения версии */
	clear(): void
	{
		this.major = 0;
		this.minor = 0;
		this.build = 0;
		this.revision = 0;
	}

	/**
	 * Запись версии
	 * @param {IVersion} ver Версия
	 */
	setVersion(ver: IVersion): boolean
	{
		if (this.is || !ver.is) return false;

		this.major = ver.major;
		this.minor = ver.minor;
		this.build = ver.build;
		this.revision = ver.revision;
		return true;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VERSION_EXEC, Version.size, new BluetoothStruct(Version.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, API_VERSION_EXEC);
	}
}
