<template>
	<q-item clickable v-ripple class="BGIconMenu">
		<q-item-section avatar />
		<q-item-section>
			<IconCustom name="PJ82" color="primary" color-secondary="secondary" size="180px" />
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
.BGIconMenu
	position: absolute
	bottom: 16px
	left: -32px
	opacity: 0.3
</style>
