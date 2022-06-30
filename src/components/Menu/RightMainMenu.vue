<template>
	<q-menu auto-close class="RightMainMenu" anchor="bottom left" transition-show="jump-down" transition-hide="jump-up">
		<ItemMenu :items="popupLanguage" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="popupMain" @click="onClickItem" />
	</q-menu>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';
import { popupLanguage, popupMain } from '@/store/menu/MenuRightMain';

export default {
	name: 'RightMainMenu',
	components: { ItemMenu },
	setup() {
		const onClickItem = (e: any) => {
			console.log('RightMainMenu -> onClickItem', e);
		};

		return {
			popupLanguage,
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
