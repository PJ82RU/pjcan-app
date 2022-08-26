<template>
	<q-list padding>
		<item-menu :items="menuHeader" @click="onClickItem" />
		<item-menu :items="menuActions" @click="onClickItem" />
		<q-separator />
		<item-menu :items="menuFooter" @click="onClickItem" />
		<q-separator />
		<b-g-icon-menu />
	</q-list>
</template>

<script lang="ts">
import ItemMenu from './ItemMenu.vue';
import BGIconMenu from './BGIconMenu.vue';
import { menuHeader, menuActions, menuFooter } from '@/store/menu/MenuLeftMain';

export default {
	name: 'LeftMainMenu',
	components: { ItemMenu, BGIconMenu },
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
