<template>
	<q-list padding>
		<ItemMenu :items="menuHeader" @click="onClickItem" />
		<ItemMenu :items="menuActions" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="menuFooter" @click="onClickItem" />
	</q-list>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';
import { menuHeader, menuActions, menuFooter } from '@/store/menu/MenuLeftMain';

export default {
	name: 'LeftMainMenu',
	components: { ItemMenu },
	setup() {
		const onClickItem = (e: any) => {
			console.log('LeftMainMenu -> onClickItem', e);
		};

		return {
			menuHeader,
			menuActions,
			menuFooter,
			onClickItem
		};
	}
};
</script>
