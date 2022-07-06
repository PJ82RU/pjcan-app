<template>
	<q-layout view="hHh lpr lFf">
		<!-- Шапка -->
		<q-header bordered class="bg-primary text-white">
			<q-toolbar class="col-8 bg-menu">
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="onToggleLeftMenuOpen" />
				<q-toolbar-title>PJ CAN</q-toolbar-title>
				<q-space />
				<!-- Кнопка подключения Bluetooth -->
				<BluetoothBtn />
				<!-- Правое меню -->
				<q-btn flat round dense icon="more_vert">
					<RightMainMenu />
				</q-btn>
			</q-toolbar>
		</q-header>

		<!-- Левое меню -->
		<q-drawer
			ref="leftMenu"
			show-if-above
			mini-to-overlay
			v-model="leftMenuOpen"
			side="left"
			:mini="leftMenuMiniState"
			:width="270"
			:breakpoint="500"
			bordered
			class="bg-grey-2"
		>
			<q-scroll-area class="fit">
				<LeftMainMenu />
			</q-scroll-area>
		</q-drawer>

		<!-- Контейнер страницы -->
		<q-page-container>
			<router-view />
		</q-page-container>

		<!-- Диалог обновление прошивки устройства -->
		<UpdateFirmwareDialog />
	</q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import LeftMainMenu from '@/components/menu/LeftMainMenu.vue';
import RightMainMenu from '@/components/menu/RightMainMenu.vue';
import BluetoothBtn from '@/components/bluetooth/BluetoothBtn.vue';
import UpdateFirmwareDialog from '@/components/updateFirmware/UpdateFirmwarePopup.vue';

export default {
	name: 'Main',
	components: { LeftMainMenu, RightMainMenu, BluetoothBtn, UpdateFirmwareDialog },
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
.q-page-container
	background-color: #444
</style>
