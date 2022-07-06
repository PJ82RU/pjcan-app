<template>
	<router-view />
</template>

<script lang="ts">
import { lang } from '@/i18n/i18nUtils';
const { name } = require('../package.json');

import '@/css/fonts.css';
import { provide, ref } from 'vue';
import { Onboard } from '@/store/onboard';

export default {
	name: 'PJCAN',
	setup() {
		provide('onboard', ref(new Onboard()));
	},
	watch: {
		'$route.name'(lng: string): void {
			document.title = `${name}: ${lang(lng)}`;
		}
	}
};
</script>
