<template>
	<q-menu auto-close class="RightMenuMain" anchor="bottom left" transition-show="jump-down" transition-hide="jump-up">
		<MenuItem name="popupDevice" @click="onClickItem" />
		<q-separator />
		<MenuItem name="popupMain" @click="onClickItem" />
	</q-menu>
</template>

<script lang="ts">
import MenuItem from '@/components/menu/MenuItem.vue';

export default {
	name: 'RightMenuMain',
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

<style lang="sass">
.RightMenuMain
	min-width: 200px !important
</style>
