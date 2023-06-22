import onboardCardListDefault from "./onboard-card-list-default";

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
