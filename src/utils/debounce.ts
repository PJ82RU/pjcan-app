/** Создать debounce */
const createDebounce = () =>
{
	let timeout: string | number | NodeJS.Timeout | undefined;
	return (fn: () => void, delay: number): void =>
	{
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(), delay || 500);
	};
};

export { createDebounce };
