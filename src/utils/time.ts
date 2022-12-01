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

export { getFormatTime };
