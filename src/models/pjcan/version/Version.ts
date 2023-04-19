import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVersion } from "./IVersion";
import { API_VERSION_SIZE, StructVersion } from "./StructVersion";

export const API_VERSION_EXEC = 6;
export const API_VERSION_EVENT = "Version";

const struct = new BluetoothStruct(StructVersion);

/** Модель версии */
export class Version extends BaseModel implements IVersion
{
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

	/** Очистить значения версии */
	clear(): void
	{
		this.major = 0;
		this.minor = 0;
		this.build = 0;
		this.revision = 0;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VERSION_EXEC, API_VERSION_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VERSION_EXEC, 1);
	}
}
