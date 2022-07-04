<template>
	<router-view />
</template>

<script lang="ts">
import { lang } from './boot/i18n';
const { name } = require('../package.json');

import '@/css/fonts.css';
import { provide, ref } from 'vue';
import { Store } from '@/store';
import { Onboard } from '@/store/onboard';

export default {
	name: 'PJCAN',
	setup() {
		provide('store', ref(new Store()));
		provide('onboard', ref(new Onboard()));
	},
	watch: {
		'$route.name'(lng: string): void {
			document.title = `${name}: ${lang(lng)}`;
		}
	}
};
</script>
