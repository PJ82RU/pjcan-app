<template>
	<q-menu auto-close class="RightMainMenu" anchor="bottom left" transition-show="jump-down" transition-hide="jump-up">
		<ItemMenu :items="popupLanguageFilter" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="popupMain" @click="onClickItem" />
	</q-menu>
</template>

<script lang="ts">
import { computed } from 'vue';
import { i18n } from '@/boot/i18n';
import ItemMenu from './ItemMenu.vue';
import { TItemMenu } from '@/models/menu';

import { popupLanguage, popupMain } from '@/store/menu/MenuRightMain';

export default {
	name: 'RightMainMenu',
	components: { ItemMenu },
	setup() {
		const popupLanguageFilter = computed(() => {
			return popupLanguage.filter((x) => {
				switch (i18n.global.locale) {
					case 'ru':
						return x.type !== TItemMenu.LANG_RUSSIAN;
					case 'en':
						return x.type !== TItemMenu.LANG_ENGLISH;
					default:
						return true;
				}
			});
		});

		const onClickItem = (e: any) => {
			console.log('RightMainMenu -> onClickItem', e);
		};

		return {
			popupLanguageFilter,
			popupMain,
			onClickItem
		};
	}
};
</script>

<style lang="sass">
.RightMainMenu
	min-width: 200px !important
</style>
