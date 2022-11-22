let debounceTimer: number | undefined;

/**
 * Установить таймер
 * @param {Function} handler Функция обратного вызова
 * @param {number} timeout Таймаут, мс
 */
const debounce = (handler: Function, timeout: number): void =>
{
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(handler, timeout);
};

/** Остановить таймер */
const clearDebounce = (): void =>
{
	clearTimeout(debounceTimer);
	debounceTimer = undefined;
};

export { debounce, clearDebounce };
