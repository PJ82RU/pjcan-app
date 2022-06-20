<template>
	<q-layout view="hHh lpr lFf">
		<q-header bordered class="bg-primary text-white">
			<q-toolbar class="col-8 bg-menu">
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="onToggleLeftMenuOpen" />
				<q-toolbar-title>PJ CAN</q-toolbar-title>
				<q-space />
				<q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
				<q-btn flat round dense icon="more_vert" @click="onToggleLeftMenuOpen" />
			</q-toolbar>
		</q-header>

		<q-drawer
			ref="leftMenu"
			show-if-above
			v-model="leftMenuOpen"
			side="left"
			:mini="leftMenuMiniState"
			:width="270"
			:breakpoint="500"
			bordered
			class="bg-grey-2"
		>
			<q-scroll-area class="fit">
				<LeftMenuMain />
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import LeftMenuMain from '@/components/menu/LeftMenuMain.vue';

export default {
	name: 'Main',
	components: { LeftMenuMain },
	setup() {
		const $q = useQuasar();
		const leftMenuOpen = ref(false);
		const leftMenuMiniState = ref(true);
		const leftMenu = ref(null);

		/** Переключатель положения левого меню */
		const onToggleLeftMenuOpen = () => {
			const { lt } = $q.screen;
			const showMenu = lt.lg && lt.md && lt.sm && lt.xl;

			if ($q.platform.is.mobile && showMenu) {
				leftMenuOpen.value = !leftMenuOpen.value;
			} else {
				leftMenuMiniState.value = !leftMenuMiniState.value;
			}
		};

		return {
			leftMenu,
			leftMenuOpen,
			leftMenuMiniState,
			onToggleLeftMenuOpen
		};
	}
};
</script>

<style lang="sass">
.bg-menu
	background-color: $menu
</style>
