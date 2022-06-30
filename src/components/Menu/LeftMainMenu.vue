<template>
	<q-list padding>
		<ItemMenu :items="menuHeader" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="menuMain" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="menuActions" @click="onClickItem" />
		<q-separator />
		<ItemMenu :items="menuFooter" @click="onClickItem" />
	</q-list>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';
import { menuHeader, menuMain, menuActions, menuFooter } from '@/store/menu/MenuLeftMain';

export default {
	name: 'LeftMainMenu',
	components: { ItemMenu },
	setup() {
		const onClickItem = (e: any) => {
			console.log('LeftMainMenu -> onClickItem', e);
		};

		return {
			menuHeader,
			menuMain,
			menuActions,
			menuFooter,
			onClickItem
		};
	}
};
</script>
