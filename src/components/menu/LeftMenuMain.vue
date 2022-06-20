<template>
	<q-list padding>
		<MenuItem name="header" @click="onClickItem" />
		<q-separator />
		<MenuItem name="main" @click="onClickItem" />
		<q-separator />
		<MenuItem name="actions" @click="onClickItem" />
		<q-separator />
		<MenuItem name="footer" @click="onClickItem" />
	</q-list>
</template>

<script lang="ts">
import IconCustom from '@/components/common/IconCustom';
import MenuItem from './MenuItem.vue';

export default {
	name: 'LeftMenuMain',
	components: { IconCustom, MenuItem },
	setup() {
		const onClickItem = (e: any) => {
			console.log(e);
		};

		return {
			onClickItem
		};
	}
};
</script>

<style lang="sass"></style>
