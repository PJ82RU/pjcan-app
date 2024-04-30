/**
 * Конвертирование числа в HEX
 * @param {number|BigInt} value Значение
 */
const toHex = (value: number | BigInt): string =>
{
	const res: string = value.toString(16);
	return res.length % 2 > 0 ? "0" + res : res;
};

/**
 * Конвертирование массива чисел в HEX
 * @param {(number|BigInt)[]} value Массив значений
 */
const arrayToHex = (value: (number | BigInt)[]): string =>
{
	let sha = "";
	value?.forEach((x) => (sha += toHex(x)));
	return sha;
};

/**
 * Чтение mac-адреса
 * @param {BigInt} value Значение mac-адреса в числовом формате
 */
const toMac = (value: BigInt): string =>
{
	let result: string = "";

	const mac: string = toHex(value);
	for (let i: number = mac.length - 2; i >= 0; i -= 2) result += mac[i] + mac[i + 1] + (i > 0 ? ":" : "");

	return result;
};

export { toHex, arrayToHex, toMac };
