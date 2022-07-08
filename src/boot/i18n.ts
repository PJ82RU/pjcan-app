import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { readLocale } from '@/i18n/i18nUtils';
import Vue3TouchEvents from 'vue3-touch-events';
import messages from 'src/i18n';
let i18n: any;

export default boot(({ app }) => {
	i18n = createI18n({ locale: readLocale(), messages });
	app.use(i18n);
	app.use(Vue3TouchEvents);
});

export { i18n };
