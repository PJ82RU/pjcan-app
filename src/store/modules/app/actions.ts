import onboardCardListDefault from "./onboard-card-list-default";
import listButtonsDefault from "./list-buttons-default";

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
export const readListButtonsSW1 = ({ commit }: { commit: any }) =>
{
	const res = window.localStorage.getItem("ListButtonsSW1");
	if (res?.length)
	{
		try
		{
			const listButtonsSW1 = JSON.parse(res);
			if (Array.isArray(listButtonsSW1))
			{
				commit("setListButtonsSW1", listButtonsSW1);
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
export const writeListButtonsSW1 = ({ getters }: { getters: any }) =>
{
	const res = JSON.stringify(getters.listButtonsSW1);
	window.localStorage.setItem("ListButtonsSW1", res);
};

/**
 * Сбросить значения списка кнопок SW1 по умолчанию
 * @param {any} commit
 * @param {any} dispatch
 */
export const resetListButtonsSW1 = ({ commit, dispatch }: { commit: any, dispatch: any }) =>
{
	commit("setListButtonsSW1", listButtonsDefault);
	dispatch("writeListButtonsSW1");
};
