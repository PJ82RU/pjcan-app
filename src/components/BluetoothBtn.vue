<template>
	<v-btn icon class="bluetooth-btn" @click="showMessage()">
		<v-icon v-if="connected">mdi-bluetooth</v-icon>
		<v-icon v-else>mdi-bluetooth-off</v-icon>
	</v-btn>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import store from "@/store";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import { BLUETOOTH_EVENT_CONNECTED, BLUETOOTH_EVENT_SEND, TConnectedStatus } from "@/components/bluetooth";

import canbus from "@/api/canbus";

import { IMessage } from "@/models/interfaces/message/IMessage";

export default {
	name: "BluetoothBtn",
	components: { DialogTemplate },
	setup()
	{
		const { t } = useI18n();
		const connected = ref(false);

		/** Показать сообщение */
		const showMessage = (): void =>
		{
			store.commit("app/setMessage", {
				title: t("BLE.title"),
				icon: "mdi-bluetooth",
				text: t(!connected.value ? "BLE.dialog.noConnected" : "BLE.dialog.connected"),
				btns: [
					{ title: t(!connected.value ? "BLE.btn.connect" : "BLE.btn.disconnect"), on: onDialogClick },
					{ title: t("btn.close"), icon: "mdi-close" }
				],
				width: 700
			} as IMessage);
		};

		/** Событие кнопки подключения/отключения Bluetooth */
		const onDialogClick = (): void =>
		{
			if (canbus.bluetooth.connected) canbus.bluetooth.disconnect();
			else canbus.bluetooth.connect();
		};

		/** Событие подключения Bluetooth */
		const onConnected = (status: TConnectedStatus): void =>
		{
			connected.value = status === TConnectedStatus.CONNECT;
			// Не выводим сообщения об отключении/подключении Bluetooth в момент прошивки устройства
			if (canbus.device.update.total > 0)
			{
				// Если устройство отключилось, значит возникли проблемы с восстановлением соединения.
				// Просим подключить устройство
				if (status === TConnectedStatus.DISCONNECT) showMessage();
				return;
			}

			switch (status)
			{
				case TConnectedStatus.NO_CONNECT:
					toast.error(t("BLE.notify.noConnected"));
					break;

				case TConnectedStatus.CONNECT:
					toast.success(t("BLE.notify.connected"));
					break;

				case TConnectedStatus.WAIT_CONNECT:
					toast.error(t("BLE.notify.lostConnected"));
					break;

				case TConnectedStatus.DISCONNECT:
					toast.warning(t("BLE.notify.disconnected"));
					break;
			}
		};

		/** Событие отправки данных */
		const onSend = (): number | string => toast.error(t("BLE.notify.noData"));

		onMounted((): void =>
		{
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_SEND, onSend);
			showMessage();
		});

		onUnmounted((): void =>
		{
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_SEND, onSend);
		});

		return {
			connected,
			showMessage,
			onDialogClick
		};
	}
};
</script>

<style lang="scss" scoped>
.bluetooth-btn {
	::v-deep(.mdi-bluetooth-off) {
		color: $error;
	}
}
</style>
