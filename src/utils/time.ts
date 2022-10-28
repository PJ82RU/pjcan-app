/**
 * Чтение форматированного времени типа hh:mm:ss
 * @param {number} msec Миллисекунды
 */
const getFormatTime = (msec: number): string =>
{
	msec /= 1000;

	const second = msec % 60;
	msec /= 60;
	const minute = msec % 60;
	msec /= 60;

	const _second = second < 10 ? "0" + second.toFixed() : second.toFixed();
	const _minute = minute < 10 ? "0" + minute.toFixed() : minute.toFixed();
	const _hour = msec < 10 ? "0" + msec.toFixed() : msec.toFixed();

	return `${_hour}:${_minute}:${_second}`;
};

export { getFormatTime };
