<template>
	<router-view />
</template>

<script lang="ts">
import { i18n } from './boot/i18n';
const { name } = require('../package.json');

export default {
	name: 'PJCAN',
	watch: {
		'$route.name'(lang: string): void {
			const _lang = i18n.t(lang);
			document.title = `${name}: ${_lang}`;
		}
	}
};
</script>
