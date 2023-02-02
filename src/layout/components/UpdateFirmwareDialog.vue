<template>
	<dialog-template v-model="visibleUpdate" icon="mdi-update" :title="$t('update.title')" text actions>
		<template #body>
			<span>{{ $t("update.dialog.new", { n: version }) }}</span>
		</template>
		<template #btns>
			<v-btn color="primary" @click="onUpdateUpload">
				{{ $t("update.btn.update") }}
			</v-btn>
			<v-btn color="primary" @click="onCancel">
				{{ $t("update.btn.later") }}
			</v-btn>
		</template>
	</dialog-template>

	<dialog-template v-model="visibleProcess" icon="mdi-update" :title="$t('update.title')" text>
		<template #body>
			<div class="pb-2 d-flex justify-space-between">
				<span>{{ message }}</span>
				<span>{{ uploading }}</span>
			</div>

			<v-progress-linear
				:model-value="progress"
				color="primary"
				height="10"
				:indeterminate="progress === 0"
				stream
				rounded
			/>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";
import router from "@/router";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/components/DialogTemplate.vue";
import { BLUETOOTH_EVENT_CONNECTED, TConnectedStatus } from "@/components/bluetooth";

import canbus, { API_EVENT_UPDATE_ERROR } from "@/api/canbus";

import { Timeout } from "@/models/types/Timeout";
import { UPDATE_BEGIN_EVENT_RESULT, UPDATE_UPLOAD_EVENT_RESULT } from "@/models/pjcan/update";

// таймаут проверки обновления 5 мин.
const DELAY_CHECK_VERSION = 300000;

export default {
	name: "UpdateFirmwareDialog",
	components: { DialogTemplate },
	setup()
	{
		const { t } = useI18n();

		const visibleUpdate = ref(false);
		const visibleProcess = ref(false);
		const version = ref("");
		const message = ref("");
		const progress = ref(0);
		const uploading = ref("");
		let timerCheckVersion: Timeout;

		/**
		 * Проверка версии прошивки
		 * @param delay Пауза проверки обновления
		 */
		const onCheckVersion = (delay: number): void =>
		{
			timerCheckVersion = setTimeout(() =>
			{
				if (canbus.bluetooth.connected)
				{
					canbus
						.checkVersion()
						.then((newVersion) =>
						{
							version.value = newVersion.toString;
							visibleUpdate.value = true;
						})
						.catch(() => onCheckVersion(DELAY_CHECK_VERSION));
				}
				else onCheckVersion(DELAY_CHECK_VERSION);
			}, delay);
		};

		/** Отменить обновление */
		const onCancel = (): void =>
		{
			visibleUpdate.value = false;
			visibleProcess.value = false;
			if (timerCheckVersion) clearTimeout(timerCheckVersion);

			canbus.removeListener(API_EVENT_UPDATE_ERROR, onErrorUpdate);
			canbus.update.upload.clear();
		};

		/**
		 * Событие подключения к Bluetooth
		 * @param {TConnectedStatus} status Статус подключения Bluetooth
		 */
		const onConnected = (status: TConnectedStatus) =>
		{
			if (canbus.update.upload.last)
			{
				if (status !== TConnectedStatus.CONNECT) return;

				// завершение прошивки
				setTimeout(() =>
				{
					if (canbus.values.version.is)
					{
						canbus
							.checkVersion()
							.then(() => toast.error(t("update.notify.warning")))
							.catch(() => toast.success(t("update.notify.completed")));

						setTimeout(() => router.go(0), 5000);
						onCancel();
					}
					else canbus.bluetooth.disconnect();
				}, 1000);
			}
			else
			{
				if (status === TConnectedStatus.CONNECT) onCheckVersion(5000);
				else if (timerCheckVersion) clearTimeout(timerCheckVersion);
			}
		};

		/** Событие запуска прошивки */
		const onUpdateUpload = (): void =>
		{
			message.value = t("update.process.preparation");
			uploading.value = "";
			progress.value = 0;
			visibleUpdate.value = false;
			visibleProcess.value = true;

			canbus.addListener(API_EVENT_UPDATE_ERROR, onErrorUpdate);
			canbus.beginUpload();
		};

		/**
		 * Событие загрузки прошивки на устройство PJCAN
		 * @param {boolean} result Результат загрузки
		 */
		const onUpload = (result: boolean) =>
		{
			if (result)
			{
				message.value = t("update.process.upload");
				progress.value = canbus.update.upload.uploading * 100;
				uploading.value = progress.value.toFixed(2) + "%";

				if (canbus.update.upload.offset === canbus.update.upload.data.byteLength)
				{
					canbus.beginUpdate();
				}
			}
			else
			{
				onErrorUpdate(t("update.notify.error"));
			}
		};

		/**
		 * Событие успешного начала прошивки устройства
		 * @param {boolean} result Результат начала прошивки
		 */
		const onUpdate = (result: boolean) =>
		{
			if (result)
			{
				message.value = t("update.process.update");
				progress.value = 0;
				uploading.value = "";
				canbus.values.version.clear();
			}
			else
			{
				onErrorUpdate(t("update.notify.error"));
			}
		};

		/** Ошибка обновления */
		const onErrorUpdate = (msg: string): void =>
		{
			toast.error(msg);
			onCancel();
		};

		onMounted(() =>
		{
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			canbus.update.upload.addListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			canbus.update.begin.addListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
		});

		onUnmounted(() =>
		{
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			canbus.update.upload.removeListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			canbus.update.begin.removeListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
			canbus.removeListener(API_EVENT_UPDATE_ERROR, onErrorUpdate);
		});

		return {
			visibleUpdate,
			visibleProcess,
			version,
			message,
			uploading,
			progress,
			onCancel,
			onUpdateUpload
		};
	}
};
</script>
