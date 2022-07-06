<template>
	<q-btn flat round dense :icon="iconClass" class="BluetoothBtn q-mr-sm" @click="onBtnClick" />
	<BluetoothDialogConnection v-model="dlgConnection" @connect="onConnect" />
	<BluetoothDialogDisconnection v-model="dlgDisconnection" @disconnect="onDisconnect" />
</template>

<script lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { lang } from '@/i18n/i18nUtils';
import api from '@/store/api';

import BluetoothDialogConnection from './BluetoothDialogConnection.vue';
import BluetoothDialogDisconnection from './BluetoothDialogDisconnection.vue';
import { BLUETOOTH_EVENT_CONNECTED, BLUETOOTH_EVENT_SEND, EConnectedStatus } from './Bluetooth_';

export default {
	name: 'BluetoothBtn',
	components: { BluetoothDialogConnection, BluetoothDialogDisconnection },
	setup() {
		const $q = useQuasar();
		const { bluetooth } = api;

		const eventConnected = (status: EConnectedStatus) => {
			switch (status) {
				case EConnectedStatus.NO_CONNECT:
					$q.notify({ message: lang('BLE_NoConnected'), position: 'bottom', color: 'red' });
					break;

				case EConnectedStatus.CONNECT:
					$q.notify({ message: lang('BLE_Connected'), position: 'bottom', color: 'green' });
					break;

				case EConnectedStatus.WAIT_CONNECT:
					$q.notify({ message: lang('BLE_LostConnected'), position: 'bottom', color: 'red' });
					break;

				case EConnectedStatus.DISCONNECT:
					$q.notify({ message: lang('BLE_Disconnected'), position: 'bottom', color: 'primary' });
					break;
			}
		};
		const eventSend = () => $q.notify({ message: lang('BLE_NoData'), position: 'bottom', color: 'red' });

		onMounted(() => {
			// события подключения к Bluetooth
			bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, eventConnected);
			// события отправки данных
			bluetooth.addListener(BLUETOOTH_EVENT_SEND, eventSend);
		});
		onUnmounted(() => {
			// события подключения к Bluetooth
			bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, eventConnected);
			// события отправки данных
			bluetooth.removeListener(BLUETOOTH_EVENT_SEND, eventSend);
		});

		// статус диалога подключения Bluetooth
		const dlgConnection = ref(true);
		// статус диалога отключения Bluetooth
		const dlgDisconnection = ref(false);
		// иконка кнопки подключения к Bluetooth
		const iconClass = computed(() => (bluetooth.connected ? 'bluetooth' : 'bluetooth_disabled'));

		/** Событие клика по кнопке Bluetooth */
		const onBtnClick = () => {
			if (!bluetooth.connected) dlgConnection.value = true;
			else dlgDisconnection.value = true;
		};
		/** Событие подключения Bluetooth */
		const onConnect = () => {
			bluetooth.connect();
		};
		/** Событие отключения Bluetooth */
		const onDisconnect = () => {
			bluetooth.disconnect();
		};

		return {
			dlgConnection,
			dlgDisconnection,
			iconClass,
			onBtnClick,
			onConnect,
			onDisconnect
		};
	}
};
</script>
