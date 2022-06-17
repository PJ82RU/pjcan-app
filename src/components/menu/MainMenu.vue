<template>
	<q-btn flat round class="MainMenu" text-color="text-dark" icon="more_vert">
		<q-menu cover anchor="top left" transition-show="jump-down" transition-hide="jump-up" auto-close>
			<q-list style="min-width: 100px">
				<q-item clickable>
					<q-item-section>{{ $t('MainMenu_ViewLCD') }}</q-item-section>
				</q-item>
				<q-separator />
				<q-item clickable>
					<q-item-section>{{ $t('MainMenu_About') }}</q-item-section>
				</q-item>
			</q-list>
		</q-menu>
	</q-btn>
</template>

<script lang="ts">
export default {
	name: 'MainMenu'
};
</script>

<style lang="sass">
.MainMenu
    position: fixed
    top: 10px
    right: 10px
</style>
