<template>
	<q-btn flat round dense :icon="iconClass" class="BluetoothBtn q-mr-sm" @click="onBtnClick" />
	<DialogBluetoothConnection v-model="dlgConnection" />
</template>

<script>
import { ref, computed } from 'vue';

import DialogBluetoothConnection from './dialogs/DialogBluetoothConnection.vue';
import Store from '@/store';

export default {
	name: 'BluetoothBtn',
	components: { DialogBluetoothConnection },
	setup() {
		// статус диалога подключения к Bluetooth
		const dlgConnection = ref(true);
		// статус подключения к Bluetooth
		const bleConnected = computed(() => Store.bluetooth.connected);
		// иконка кнопки подключения к Bluetooth
		const iconClass = computed(() => (bleConnected.value ? 'bluetooth' : 'bluetooth_disabled'));

		/** Событие клика по кнопке Bluetooth */
		const onBtnClick = () => {
			if (!bleConnected.value) dlgConnection.value = true;
		};

		return {
			dlgConnection,
			bleConnected,
			iconClass,
			onBtnClick
		};
	}
};
</script>
