import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
let i18n: any;

export default boot(({ app }) => {
	const locale = (
		window.navigator
			? //@ts-ignore
			  window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage
			: 'ru'
	)
		.substr(0, 2)
		.toLowerCase();

	i18n = createI18n({ locale, messages });
	app.use(i18n);
});

const lang = (name: string) => i18n.global.t(name);
export { i18n, lang };
