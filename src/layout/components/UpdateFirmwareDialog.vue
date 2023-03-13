<template>
	<dialog-template v-model="visibleUpdate" icon="mdi-update" :title="$t('update.title')" text actions>
		<template #body>
			<span>{{ $t("update.dialog.new", { n: version }) }}</span>
		</template>
		<template #btns>
			<v-btn color="primary" @click="onUpdateStart">
				{{ $t("update.btn.update") }}
			</v-btn>
			<v-btn color="primary" @click="onCancel">
				{{ $t("update.btn.later") }}
			</v-btn>
		</template>
	</dialog-template>

	<dialog-template v-model="visibleProcess" icon="mdi-update" :title="$t('update.title')" text>
		<template #body>
			<div class="d-flex justify-space-between" :class="{ 'pb-3': progress === 0 || !timeLeft?.length }">
				<span>{{ message }}</span>
				<span>{{ uploading }}</span>
			</div>
			<div v-if="progress > 0 && timeLeft?.length" class="pb-3 d-flex justify-space-between">
				<span>{{ $t("update.process.timeLeft") }}</span>
				<span>{{ timeLeft }}</span>
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
import { API_EVENT_UPDATE } from "@/models/pjcan/update";

import { getFormatTime } from "@/utils/time";

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
		const timeLeft = ref("");
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
			canbus.update.clear();
		};

		/**
		 * Событие подключения к Bluetooth
		 * @param {TConnectedStatus} status Статус подключения Bluetooth
		 */
		const onConnected = (status: TConnectedStatus) =>
		{
			if (canbus.update.total > 0)
			{
				if (status !== TConnectedStatus.CONNECT) return;

				// завершение прошивки
				setTimeout(() =>
				{
					if (canbus.configs.version.is)
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
		const onUpdateStart = (): void =>
		{
			message.value = t("update.process.preparation");
			uploading.value = "";
			progress.value = 0;
			visibleUpdate.value = false;
			visibleProcess.value = true;

			canbus.addListener(API_EVENT_UPDATE_ERROR, onErrorUpdate);
			canbus.updateStart();
		};

		const last = {
			value: 0,
			offset: 0,
			now: 0
		};

		/**
		 * Событие загрузки прошивки на устройство PJCAN
		 * @param {number} error Код ошибки
		 */
		const onUpdate = (error: number) =>
		{
			if (error === 0)
			{
				if (canbus.update.offset < canbus.update.total)
				{
					message.value = t("update.process.upload");
					progress.value = canbus.update.uploading * 100;
					uploading.value = progress.value.toFixed(2) + "%";
					canbus.updateUpload();

					// подсчет оставшегося времени
					if (!last.now)
					{
						last.value = 0;
						last.offset = canbus.update.offset;
						last.now = Date.now();
					}
					else
					{
						const value = Math.floor((canbus.update.total - canbus.update.offset) / (canbus.update.offset - last.offset) * (Date.now() - last.now));
						last.value = Math.floor((last.value + value) / 2);
						last.offset = canbus.update.offset;
						last.now = Date.now();
						timeLeft.value = getFormatTime(last.value);
					}
				}
				else
				{
					message.value = t("update.process.update");
					progress.value = 0;
					uploading.value = "";

					last.now = 0;
					timeLeft.value = "";

					canbus.configs.version.clear();
				}
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
			canbus.update.addListener(API_EVENT_UPDATE, onUpdate);
		});

		onUnmounted(() =>
		{
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			canbus.update.removeListener(API_EVENT_UPDATE, onUpdate);
			canbus.removeListener(API_EVENT_UPDATE_ERROR, onErrorUpdate);
		});

		return {
			visibleUpdate,
			visibleProcess,
			version,
			message,
			uploading,
			timeLeft,
			progress,
			onCancel,
			onUpdateStart
		};
	}
};
</script>
