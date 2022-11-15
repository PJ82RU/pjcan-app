import { IVersion } from "./IVersion";

/** Модель версии */
export class Version implements IVersion
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
