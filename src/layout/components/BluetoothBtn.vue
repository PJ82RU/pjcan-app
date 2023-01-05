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
			<v-btn color="primary" @click="onCloseClick">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/components/DialogTemplate.vue";

import canbus from "@/api/canbus";
import { BLUETOOTH_EVENT_CONNECTED, BLUETOOTH_EVENT_SEND, TConnectedStatus } from "@/components/bluetooth";

export default {
	name: "BluetoothBtn",
	components: { DialogTemplate },
	emits: ["click"],
	setup(props: any, { emit }: { emit: any })
	{
		const { t } = useI18n();

		const visibleDialog = ref(true);
		const connected = ref(false);

		/** Событие закрытия диалога */
		const onCloseClick = () =>
		{
			visibleDialog.value = false;
			emit("click");
		};

		/** Событие кнопки подключения/отключения Bluetooth */
		const onDialogClick = () =>
		{
			if (canbus.bluetooth.connected) canbus.bluetooth.disconnect();
			else canbus.bluetooth.connect();

			onCloseClick();
		};

		/** Событие подключения Bluetooth */
		const onConnected = (status: TConnectedStatus) =>
		{
			connected.value = status === TConnectedStatus.CONNECT;
			// Не выводим сообщения об отключении/подключении Bluetooth в момент прошивки устройства
			if (canbus.update.upload.last)
			{
				// Если устройство отключилось, значит возникли проблемы с восстановлением соединения.
				// Просим подключить устройство
				if (status === TConnectedStatus.DISCONNECT) visibleDialog.value = true;
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
		const onSend = () => toast.error(t("BLE.notify.noData"));

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
			onCloseClick,
			onDialogClick
		};
	}
};
</script>
