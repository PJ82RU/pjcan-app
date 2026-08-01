// noinspection JSUnresolvedVariable,JSValidateTypes,JSUnresolvedFunction,DuplicatedCode

import { createI18n } from "vue-i18n";
import locale_ru from "./ru";
import locale_en from "./en";
import locale_es from "./es";
import locale_pl from "./pl";
import locale_de from "./de";
import locale_fr from "./fr";
import moment from "moment";

const defaultLocale = "ru";
const messages = {
	ru: locale_ru,
	en: locale_en,
	es: locale_es,
	pl: locale_pl,
	de: locale_de,
	fr: locale_fr
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

const pluralizationRule = (choice: number, choicesLength: number): number =>
{
	if (choice === 0) return 0;

	const teen = choice > 10 && choice < 20;
	const endsWithOne = choice % 10 === 1;

	if (choicesLength < 4)
	{
		return !teen && endsWithOne ? 1 : 2;
	}
	if (!teen && endsWithOne)
	{
		return 1;
	}
	if (!teen && choice % 10 >= 2 && choice % 10 <= 4)
	{
		return 2;
	}
	return choicesLength < 4 ? 2 : 3;
};

const i18n = createI18n({
	locale: getLanguage(),
	fallbackLocale: "en",
	messages,
	warnHtmlMessage: false,
	pluralizationRules: {
		ru: pluralizationRule,
		en: pluralizationRule,
		es: pluralizationRule,
		pl: pluralizationRule,
		de: pluralizationRule,
		fr: pluralizationRule
	}
});

const t = i18n.global.t;

export default i18n;
export { getLanguageList, getLanguage, t };
