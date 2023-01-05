// noinspection JSUnresolvedVariable,JSValidateTypes,JSUnresolvedFunction,DuplicatedCode

import { createI18n } from "vue-i18n";
import locale_ru from "./ru";
import locale_en from "./en";
import moment from "moment";

const defaultLocale = "ru";
const messages = {
	ru: locale_ru,
	en: locale_en
};

/** Список доступных языков */
const getLanguageList = () => Object.keys(messages);

const getLanguage = () =>
{
	// @ts-ignore
	const language = (navigator.language || navigator.browserLanguage).toLowerCase();
	const locale = getLanguageList().find((x) => language.indexOf(x) > -1) ?? defaultLocale;
	moment.locale(locale);
	return locale;
};

const i18n = createI18n({
	locale: getLanguage(),
	fallbackLocale: "en",
	messages,
	warnHtmlMessage: false,
	pluralizationRules: {
		ru: (choice: number, choicesLength: number): number =>
		{
			if (choice === 0) return 0;

			const teen = choice > 10 && choice < 20;
			const endsWithOne = choice % 10 === 1;

			return choicesLength < 4
				? !teen && endsWithOne
					? 1
					: 2
				: !teen && endsWithOne
					? 1
					: !teen && choice % 10 >= 2 && choice % 10 <= 4
						? 2
						: choicesLength < 4
							? 2
							: 3;
		},
		en: (choice: number, choicesLength: number): number =>
		{
			if (choice === 0) return 0;

			const teen = choice > 10 && choice < 20;
			const endsWithOne = choice % 10 === 1;

			return choicesLength < 4
				? !teen && endsWithOne
					? 1
					: 2
				: !teen && endsWithOne
					? 1
					: !teen && choice % 10 >= 2 && choice % 10 <= 4
						? 2
						: choicesLength < 4
							? 2
							: 3;
		}
	}
});

const t = i18n.global.t;

export default i18n;
export { getLanguageList, getLanguage, t };
