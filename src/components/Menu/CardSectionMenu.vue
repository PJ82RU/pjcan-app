<template>
	<q-menu
		auto-close
		class="CardSectionMenu"
		anchor="bottom left"
		transition-show="jump-down"
		transition-hide="jump-up"
	>
		<ItemMenu :items="popupCardSection" @click="onClickItem" />
	</q-menu>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';
import { popupCardSection } from '@/store/menu/cardSectionMenu';

export default {
	name: 'CardSectionMenu',
	components: { ItemMenu },
	emits: ['click'],
	setup(props: any, context: any) {
		const onClickItem = (e: any) => context.emit('click', e);

		return {
			popupCardSection,
			onClickItem
		};
	}
};
</script>

<style lang="sass">
.CardSectionMenu
	min-width: 200px !important
</style>
