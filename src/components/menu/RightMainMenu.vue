<template>
	<q-menu auto-close class="RightMainMenu" anchor="bottom left" transition-show="jump-down" transition-hide="jump-up">
		<ItemMenu :items="popupLanguageFilter" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="popupMain" @click="onClickItem" />
	</q-menu>
	<AboutModal v-model="about" @clickDeviceInfo="deviceInfo = true" />
	<DeviceInfoModal v-model="deviceInfo" />
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import ItemMenu from './ItemMenu.vue';
import AboutModal from '@/components/about/AboutModal.vue';
import DeviceInfoModal from '@/components/about/DeviceInfoModal.vue';
import { TItemMenu, TLangLocale } from '@/models/menu';

import { popupLanguage, popupMain } from '@/store/menu/MenuRightMain';
import { getLocale, setLocale } from '@/i18n/i18nUtils';

export default {
	name: 'RightMainMenu',
	components: { ItemMenu, AboutModal, DeviceInfoModal },
	setup() {
		/** Отфильтрованный список меню */
		const popupLanguageFilter = computed(() => {
			// убираем из списка переключение на текущий язык
			return popupLanguage.filter((x) => {
				switch (getLocale()) {
					case TLangLocale.LANG_RUSSIAN:
						return x.type !== TItemMenu.LANG_RUSSIAN;
					case TLangLocale.LANG_ENGLISH:
						return x.type !== TItemMenu.LANG_ENGLISH;
					default:
						return true;
				}
			});
		});
		const about = ref(false);
		const deviceInfo = ref(false);

		/** Выбор пункта меню */
		const onClickItem = (e: any) => {
			//console.log('RightMainMenu -> onClickItem', e);

			switch (e?.type) {
				case TItemMenu.LANG_RUSSIAN:
					// выбор английского языка
					setLocale(TLangLocale.LANG_RUSSIAN);
					break;
				case TItemMenu.LANG_ENGLISH:
					// выбор русского языка
					setLocale(TLangLocale.LANG_ENGLISH);
					break;
				case TItemMenu.ABOUT:
					about.value = true;
					break;
			}
		};

		return {
			popupLanguageFilter,
			popupMain,
			about,
			deviceInfo,
			onClickItem
		};
	}
};
</script>

<style lang="sass">
.RightMainMenu
	min-width: 200px !important
</style>
