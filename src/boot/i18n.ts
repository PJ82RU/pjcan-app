import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { readLocale } from '@/i18n/i18nUtils';
import messages from 'src/i18n';
let i18n: any;

export default boot(({ app }) => {
	i18n = createI18n({ locale: readLocale(), messages });
	app.use(i18n);
});

export { i18n };
