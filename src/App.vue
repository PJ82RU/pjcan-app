<template>
	<div class="PJApp">
		<router-view />
	</div>

	<MainMenu />
	<!--<DialogBluetoothConnection />-->
	<DialogUpdateFirmware />
</template>

<script lang="ts">
import MainMenu from 'components/menu/MainMenu.vue';
import DialogBluetoothConnection from 'components/bluetooth/dialogs/DialogBluetoothConnection.vue';
import DialogUpdateFirmware from 'components/update-firmware/dialogs/DialogUpdateFirmware.vue';
import { i18n } from './boot/i18n';

const { name } = require('../package.json');

export default {
	name: 'PJCAN',
	components: {
		MainMenu,
		DialogBluetoothConnection,
		DialogUpdateFirmware
	},
	watch: {
		'$route.name'(lang: string): void {
			const _lang = i18n.t(lang);
			document.title = `${name}: ${_lang}`;
		}
	}
};
</script>

<style lang="sass">
.PJApp
	position: absolute
	width: 100%
	height: 100%
	overflow: hidden
	padding: 8px
</style>
