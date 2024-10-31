import onboardCardsDefault from "./onboard-cards-default";
import sw1Default from "./sw1-default";

/**
 * Чтение языка из local storage
 * @param {any} commit
 */
export const readLanguage = ({ commit }: { commit: any }): void =>
{
	const res = window.localStorage.getItem("Language");
	if (res?.length)
	{
		try
		{
			const language = JSON.parse(res);
			commit("setLanguage", language);
		}
		catch (e)
		{
			console.log(e);
		}
	}
};

/**
 * Запись языка в local storage
 * @param {any} commit
 */
export const writeLanguage = ({ getters }: { getters: any }): void =>
{
	const res = JSON.stringify(getters.language);
	window.localStorage.setItem("Language", res);
};

/**
 * Чтение списка onboardCards из local storage
 * @param {any} commit
 */
export const readOnboardCards = ({ commit }: { commit: any }) =>
{
	const res = window.localStorage.getItem("OnboardCards");
	if (res?.length)
	{
		try
		{
			const onboardCards = JSON.parse(res);
			if (Array.isArray(onboardCards))
			{
				commit("setOnboardCards", onboardCards);
			}
		}
		catch (e)
		{
			console.log(e);
		}
	}
};

/**
 * Запись списка onboardCards в local storage
 * @param {any} commit
 */
export const writeOnboardCards = ({ getters }: { getters: any }) =>
{
	const res = JSON.stringify(getters.onboardCards);
	window.localStorage.setItem("OnboardCardList", res);
};

/**
 * Сбросить значения списка onboardCards по умолчанию
 * @param {any} commit
 * @param {any} dispatch
 */
export const resetOnboardCards = ({ commit, dispatch }: { commit: any, dispatch: any }) =>
{
	commit("setOnboardCards", onboardCardsDefault);
	dispatch("writeOnboardCards");
};

/**
 * Чтение списка кнопок SW1 из local storage
 * @param {any} commit
 */
export const readSW1 = ({ commit }: { commit: any }) =>
{
	const res = window.localStorage.getItem("SW1List");
	if (res?.length)
	{
		try
		{
			const list = JSON.parse(res);
			if (Array.isArray(list))
			{
				commit("setSW1", list);
			}
		}
		catch (e)
		{
			console.log(e);
		}
	}
};

/**
 * Запись списка кнопок SW1 в local storage
 * @param {any} commit
 */
export const writeSW1 = ({ getters }: { getters: any }) =>
{
	const res = JSON.stringify(getters.sw1);
	window.localStorage.setItem("SW1List", res);
};

/**
 * Сбросить значения списка кнопок SW1 по умолчанию
 * @param {any} commit
 * @param {any} dispatch
 */
export const resetSW1 = ({ commit, dispatch }: { commit: any, dispatch: any }) =>
{
	commit("setSW1", sw1Default);
	dispatch("writeSW1");
};
