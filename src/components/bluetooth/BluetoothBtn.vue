<template>
	<q-btn flat round dense :icon="iconClass" class="BluetoothBtn q-mr-sm" @click="onBtnClick" />
	<BluetoothDialogConnection v-model="dlgConnection" />
</template>

<script>
import { ref, computed, inject } from 'vue';

import BluetoothDialogConnection from './BluetoothDialogConnection.vue';

export default {
	name: 'BluetoothBtn',
	components: { BluetoothDialogConnection },
	setup() {
		const store = inject('store');
		const { bluetooth } = store?.value;

		// статус диалога подключения к Bluetooth
		const dlgConnection = ref(true);
		// иконка кнопки подключения к Bluetooth
		const iconClass = computed(() => (bluetooth.connected ? 'bluetooth' : 'bluetooth_disabled'));

		/** Событие клика по кнопке Bluetooth */
		const onBtnClick = () => {
			if (!bluetooth.connected) dlgConnection.value = true;
		};

		return {
			dlgConnection,
			iconClass,
			onBtnClick
		};
	}
};
</script>
