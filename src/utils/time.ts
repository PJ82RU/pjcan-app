/**
 * Чтение форматированного времени типа hh:mm:ss
 * @param {number|bigint} value Значение
 * @param {boolean} msec Миллисекунды или секунды
 */
const getFormatTime = (value: number | bigint, msec: boolean = true): string =>
{
	let _msec = typeof value === "number"
		? (msec ? value / 1000 : value)
		: msec ? Number(value / BigInt(1000)) : Number(value);

	const second = Math.floor(_msec % 60);
	_msec /= 60;
	const minute = Math.floor(_msec % 60);
	_msec /= 60;

	const _second = second < 10 ? "0" + second.toString() : second.toString();
	const _minute = minute < 10 ? "0" + minute.toString() : minute.toString();
	const _hour = _msec < 10 ? "0" + Math.floor(_msec).toString() : Math.floor(_msec).toString();

	return `${_hour}:${_minute}:${_second}`;
};

class RemainingTime
{
	protected _now: number;
	protected _total: number;
	protected _offset: number;
	protected _values: number[];
	protected _index: number;
	protected _countValues: number;

	/** Текущая дата */
	get now(): number
	{
		return this._now;
	}
	/** Итого */
	get total(): number
	{
		return this._total;
	}
	/** Текущая позиция */
	get offset(): number
	{
		return this._offset;
	}
	/** Изменить текущую позицию */
	set offset(val: number)
	{
		const now = Date.now();
		const value = Math.floor(((this._total - val) / (val - this._offset)) * (now - this._now));
		if (value !== Infinity)
		{
			this._index++;
			if (this._index > this._countValues) this._index = 0;
			if (this._values.length <= this._index) this._values.push(value);
			else this._values[this._index] = value;

			this._offset = val;
			this._now = now;
		}
	}
	/** Последнее значение */
	get value(): number
	{
		return this._values[this._index];
	}
	/** Среднее значение */
	get avg(): number
	{
		if (this._values.length === 0) return 0;

		let result = 0;
		this._values.forEach((x: number) => (result += x));
		return Math.floor(result / this._values.length);
	}

	constructor(total: number, countValues: number = 10)
	{
		this._now = Date.now();
		this._offset = 0;
		this._total = total;
		this._values = [];
		this._index = -1;
		this._countValues = countValues;
	}

	get(): string
	{
		return getFormatTime(this.avg);
	}
}

export { getFormatTime, RemainingTime };
