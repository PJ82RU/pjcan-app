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

	const second = _msec % 60;
	_msec /= 60;
	const minute = _msec % 60;
	_msec /= 60;

	const _second = second < 10 ? "0" + second.toFixed() : second.toFixed();
	const _minute = minute < 10 ? "0" + minute.toFixed() : minute.toFixed();
	const _hour = _msec < 10 ? "0" + _msec.toFixed() : _msec.toFixed();

	return `${_hour}:${_minute}:${_second}`;
};

export { getFormatTime };
