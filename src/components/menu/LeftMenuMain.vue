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
import MenuItem from './MenuItem.vue';

export default {
	name: 'LeftMenuMain',
	components: { MenuItem },
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
