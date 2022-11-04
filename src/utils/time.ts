/**
 * Чтение форматированного времени типа hh:mm:ss
 * @param {number|bigint} msec Миллисекунды
 */
const getFormatTime = (msec: number | bigint): string =>
{
	let _msec;
	if (typeof msec === "number") _msec = msec / 1000;
	else _msec = Number(msec / BigInt(1000));

	const second = _msec % 60;
	_msec /= 60;
	const minute = _msec % 60;
	_msec /= 60;

	const _second = second < 10 ? "0" + second.toFixed() : second.toFixed();
	const _minute = minute < 10 ? "0" + minute.toFixed() : minute.toFixed();
	const _hour = msec < 10 ? "0" + _msec.toFixed() : _msec.toFixed();

	return `${_hour}:${_minute}:${_second}`;
};

export { getFormatTime };
