<template>
	<q-menu auto-close class="RightMenuMain" anchor="bottom left" transition-show="jump-down" transition-hide="jump-up">
		<MenuItem name="popup" @click="onClickItem" />
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
	min-width: 180px !important
</style>
