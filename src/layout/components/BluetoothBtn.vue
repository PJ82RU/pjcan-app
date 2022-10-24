<template>
	<v-btn icon class="bluetooth-btn" @click="visibleDialog = true">
		<v-icon v-if="connected">mdi-bluetooth</v-icon>
		<v-icon v-else>mdi-bluetooth-off</v-icon>
	</v-btn>

	<dialog-template v-model="visibleDialog" icon="mdi-bluetooth" :title="$t('BLE.title')" text actions>
		<template #body>
			{{ $t(!connected ? "BLE.dialog.noConnected" : "BLE.dialog.connected") }}
		</template>
		<template #btns>
			<v-btn color="primary" @click="onDialogClick">
				{{ $t(!connected ? "BLE.btn.connect" : "BLE.btn.disconnect") }}
			</v-btn>
			<v-btn color="primary" @click="visibleDialog = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import DialogTemplate from "@/components/DialogTemplate.vue";

import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";
import i18n from "@/lang";
import canbus from "@/api/canbus";
import { BLUETOOTH_EVENT_CONNECTED, BLUETOOTH_EVENT_SEND, TConnectedStatus } from "@/components/bluetooth";
import update from "@/components/firmware";

export default {
	name: "BluetoothBtn",
	components: { DialogTemplate },
	setup()
	{
		const visibleDialog = ref(true);
		const connected = ref(false);

		/** Событие кнопки подключения/отключения Bluetooth */
		const onDialogClick = () =>
		{
			if (canbus.bluetooth.connected) canbus.bluetooth.disconnect();
			else canbus.bluetooth.connect();

			visibleDialog.value = false;
		};

		/** Событие подключения Bluetooth */
		const onConnected = (status: TConnectedStatus) =>
		{
			connected.value = status === TConnectedStatus.CONNECT;
			// не выводим сообщения об отключении/подключении Bluetooth в момент прошивки устройства
			if (update.isUpdated) return;

			switch (status)
			{
				case TConnectedStatus.NO_CONNECT:
					toast.error(i18n.global.t("BLE.notify.noConnected"));
					break;

				case TConnectedStatus.CONNECT:
					toast.success(i18n.global.t("BLE.notify.connected"));
					break;

				case TConnectedStatus.WAIT_CONNECT:
					toast.error(i18n.global.t("BLE.notify.lostConnected"));
					break;

				case TConnectedStatus.DISCONNECT:
					toast.warning(i18n.global.t("BLE.notify.disconnected"));
					break;
			}
		};

		/** Событие отправки данных */
		const onSend = () => toast.error(i18n.global.t("BLE.notify.noData"));

		onMounted(() =>
		{
			// событие подключения Bluetooth
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			// событие отправки данных
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_SEND, onSend);
		});

		onUnmounted(() =>
		{
			// события подключения к Bluetooth
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			// события отправки данных
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_SEND, onSend);
		});

		return {
			visibleDialog,
			connected,
			onDialogClick
		};
	}
};
</script>
