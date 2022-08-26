<template>
	<q-btn flat round dense :icon="iconClass" class="bluetooth-btn q-mr-sm" @click="onBtnClick" />
	<bluetooth-dialog-connection v-model="dlgConnection" @connect="onConnect" />
	<bluetooth-dialog-disconnection v-model="dlgDisconnection" @disconnect="onDisconnect" />
</template>

<script lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { lang } from '@/i18n/i18nUtils';
import api from '@/store/api';

import BluetoothDialogConnection from './BluetoothPopupConnection.vue';
import BluetoothDialogDisconnection from './BluetoothPopupDisconnection.vue';
import { BLUETOOTH_EVENT_CONNECTED, BLUETOOTH_EVENT_SEND, TConnectedStatus } from './Bluetooth';

export default {
	name: 'BluetoothBtn',
	components: { BluetoothDialogConnection, BluetoothDialogDisconnection },
	setup() {
		const $q = useQuasar();
		const { bluetooth, updateFirmware } = api;

		// статус подключения
		const connected = ref(false);

		// событие подключения Bluetooth
		const onConnected = (status: TConnectedStatus) => {
			connected.value = status === TConnectedStatus.CONNECT;
			// не выводим сообщения об отключении/подключении Bluetooth в момент прошивки устройства
			if (updateFirmware.isUpdated) return;

			switch (status) {
				case TConnectedStatus.NO_CONNECT:
					$q.notify({ message: lang('BLE_NoConnected'), position: 'bottom', color: 'red' });
					break;

				case TConnectedStatus.CONNECT:
					$q.notify({ message: lang('BLE_Connected'), position: 'bottom', color: 'green' });
					break;

				case TConnectedStatus.WAIT_CONNECT:
					$q.notify({ message: lang('BLE_LostConnected'), position: 'bottom', color: 'red' });
					break;

				case TConnectedStatus.DISCONNECT:
					$q.notify({ message: lang('BLE_Disconnected'), position: 'bottom', color: 'primary' });
					break;
			}
		};
		// событие отправки данных
		const onSend = () => $q.notify({ message: lang('BLE_NoData'), position: 'bottom', color: 'red' });

		onMounted(() => {
			// событие подключения Bluetooth
			bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			// событие отправки данных
			bluetooth.addListener(BLUETOOTH_EVENT_SEND, onSend);
		});
		onUnmounted(() => {
			// события подключения к Bluetooth
			bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			// события отправки данных
			bluetooth.removeListener(BLUETOOTH_EVENT_SEND, onSend);
		});

		// статус диалога подключения Bluetooth
		const dlgConnection = ref(true);
		// статус диалога отключения Bluetooth
		const dlgDisconnection = ref(false);
		// иконка кнопки подключения к Bluetooth
		const iconClass = computed(() => (connected.value ? 'bluetooth' : 'bluetooth_disabled'));

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
			connected.value = false;
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
