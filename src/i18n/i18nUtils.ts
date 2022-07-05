import { TLangLocale } from '@/models/menu';
import { i18n } from '@/boot/i18n';

const SegregateStorage: any = require('segregate-local-storage');
const storageLocal: any = new SegregateStorage('i18n');

const LOCALE_KEY = 'locale';

/** Значение языковой переменной */
const lang = (name: string) => i18n?.global.t(name);

/** Определение языка */
const readLocale = (): TLangLocale => {
	return (
		storageLocal.get(LOCALE_KEY) ??
		//@ts-ignore
		((navigator?.language || navigator?.systemLanguage || navigator?.userLanguage)
			?.substr(0, 2)
			.toLowerCase() as TLangLocale) ??
		TLangLocale.LANG_RUSSIAN
	);
};

/** Текущий язык */
const getLocale = (): TLangLocale => i18n?.global.locale as TLangLocale;

/**
 * Изменить текущий язык
 * @param {TLangLocale} lng Двух символьное значение языка
 */
const setLocale = (lng: TLangLocale): void => {
	if (!i18n) return;

	const { global } = i18n;
	global.locale = lng;
	storageLocal.set(LOCALE_KEY, lng);
};

export { lang, readLocale, getLocale, setLocale };
