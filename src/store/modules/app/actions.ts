import onboardCardListDefault from "./onboard-card-list-default";
import buttonsDefault from "./buttons-default";

/**
 * Чтение списка onboardCardList из local storage
 * @param {any} commit
 */
export const readOnboardCardList = ({ commit }: { commit: any }) =>
{
	const res = window.localStorage.getItem("OnboardCardList");
	if (res?.length)
	{
		try
		{
			const onboardCardList = JSON.parse(res);
			if (Array.isArray(onboardCardList))
			{
				commit("setOnboardCardList", onboardCardList);
			}
		}
		catch (e)
		{
			console.log(e);
		}
	}
};

/**
 * Запись списка onboardCardList в local storage
 * @param {any} commit
 */
export const writeOnboardCardList = ({ getters }: { getters: any }) =>
{
	const res = JSON.stringify(getters.onboardCardList);
	window.localStorage.setItem("OnboardCardList", res);
};

/**
 * Сбросить значения списка onboardCardList по умолчанию
 * @param {any} commit
 * @param {any} dispatch
 */
export const resetOnboardCardList = ({ commit, dispatch }: { commit: any, dispatch: any }) =>
{
	commit("setOnboardCardList", onboardCardListDefault);
	dispatch("writeOnboardCardList");
};

/**
 * Чтение списка кнопок SW1 из local storage
 * @param {any} commit
 */
export const readSW1 = ({ commit }: { commit: any }) =>
{
	const res = window.localStorage.getItem("ListButtonsSW1");
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
	window.localStorage.setItem("ListButtonsSW1", res);
};

/**
 * Сбросить значения списка кнопок SW1 по умолчанию
 * @param {any} commit
 * @param {any} dispatch
 */
export const resetSW1 = ({ commit, dispatch }: { commit: any, dispatch: any }) =>
{
	commit("setSW1", buttonsDefault);
	dispatch("writeSW1");
};
