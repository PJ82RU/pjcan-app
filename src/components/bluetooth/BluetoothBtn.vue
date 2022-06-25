<template>
	<q-btn flat round dense :icon="iconClass" class="BluetoothBtn q-mr-sm" @click="onBtnClick" />
	<BluetoothDialogConnection v-model="dlgConnection" />
</template>

<script>
import { ref, computed } from 'vue';

import BluetoothDialogConnection from './BluetoothDialogConnection.vue';
import Store from '@/store';

export default {
	name: 'BluetoothBtn',
	components: { BluetoothDialogConnection },
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
