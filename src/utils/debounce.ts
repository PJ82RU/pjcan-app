/** Создать debounce */
const createDebounce = () =>
{
	let timeout: string | number | NodeJS.Timeout | undefined;
	return (fn: () => void, delay: number): void =>
	{
		clearTimeout(timeout);
		if (delay > 0) timeout = setTimeout(() => fn(), delay);
	};
};

export { createDebounce };
