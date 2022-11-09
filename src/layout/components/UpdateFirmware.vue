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
import DialogTemplate from "@/components/DialogTemplate.vue";

import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { $t } from "@/lang";

import { Timeout } from "@/models/types/Timeout";
import { UPDATE_BEGIN_EVENT_RESULT, UPDATE_UPLOAD_EVENT_RESULT } from "@/models/pjcan/update";
import canbus from "@/api/canbus";
import update from "@/components/firmware";
import { BLUETOOTH_EVENT_CONNECTED, TConnectedStatus } from "@/components/bluetooth";

// таймаут проверки обновления 5 мин.
const DELAY_CHECK_VERSION = 300000;

export default {
	name: "UpdateFirmware",
	components: { DialogTemplate },
	setup()
	{
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
				if (canbus.bluetooth.connected && canbus.version.is)
				{
					update
						.checkNewVersion()
						.then(() =>
						{
							version.value = update.newVersion.toString;
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
			update.clear();
		};

		/** Ошибка обновления */
		const onErrorUpdate = (): void =>
		{
			toast.error($t("update.notify.error"));
			onCancel();
		};

		/**
		 * Событие подключения к Bluetooth
		 * @param {TConnectedStatus} status Статус подключения Bluetooth
		 */
		const onConnected = (status: TConnectedStatus) =>
		{
			if (update.isUpdated)
			{
				if (status !== TConnectedStatus.CONNECT) return;

				// завершение прошивки
				update
					.checkNewVersion()
					.then(() => toast.error($t("update.notify.warning")))
					.catch(() => toast.error($t("update.notify.completed")));

				update.isUpdated = false;
				onCancel();
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
			message.value = $t("update.process.preparation");
			uploading.value = "";
			progress.value = 0;
			visibleUpdate.value = false;
			visibleProcess.value = true;
			update.upload();
		};

		/**
		 * Событие загрузки прошивки на устройство PJCAN
		 * @param {boolean} result Результат загрузки
		 */
		const onUpload = (result: boolean) =>
		{
			if (result)
			{
				message.value = $t("update.process.upload");
				progress.value = update.uploading * 100;
				uploading.value = progress.value.toFixed(2) + "%";

				if (update.resultUpload.offset === update.resultUpload.data.byteLength) update.begin();
			}
			else
			{
				onErrorUpdate();
			}
		};

		/**
		 * Событие успешного начала прошивки устройства
		 * @param {boolean} result Результат начала прошивки
		 */
		const onUpdate = (result: boolean) =>
		{
			update.isUpdated = result;
			if (result)
			{
				message.value = $t("update.process.update");
				progress.value = 0;
				uploading.value = "";
			}
			else
			{
				onErrorUpdate();
			}
		};

		onMounted(() =>
		{
			canbus.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			update.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			update.resultBegin.addListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
		});

		onUnmounted(() =>
		{
			canbus.bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
			update.resultUpload.removeListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			update.resultBegin.removeListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
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
