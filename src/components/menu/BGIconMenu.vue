<template>
	<q-item clickable v-ripple class="bg-icon-menu">
		<q-item-section avatar />
		<q-item-section>
			<icon-custom name="PJ82" size="180px" />
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import IconCustom from '@/components/common/iconCustom';

export default {
	name: 'BGIconMenu',
	components: { IconCustom }
};
</script>

<style lang="sass">
.bg-icon-menu
	position: absolute
	bottom: 16px
	left: -32px
	opacity: 0.3
</style>
