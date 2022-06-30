<template>
	<q-menu
		auto-close
		class="CardSectionMenu"
		anchor="bottom left"
		transition-show="jump-down"
		transition-hide="jump-up"
	>
		<ItemMenu name="popupCardSection" @click="onClickItem" />
	</q-menu>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';

export default {
	name: 'CardSectionMenu',
	components: { ItemMenu },
	emits: ['click'],
	setup(props: any, context: any) {
		const onClickItem = (e: any) => context.emit('click', e);

		return {
			onClickItem
		};
	}
};
</script>

<style lang="sass">
.CardSectionMenu
	min-width: 200px !important
</style>
