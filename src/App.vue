<template>
	<router-view />
</template>

<script lang="ts">
import { lang } from './boot/i18n';
const { name } = require('../package.json');

import '@/css/fonts.css';

export default {
	name: 'PJCAN',
	watch: {
		'$route.name'(lng: string): void {
			document.title = `${name}: ${lang(lng)}`;
		}
	}
};
</script>
