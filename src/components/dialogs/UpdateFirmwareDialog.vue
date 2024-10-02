<template>
	<dialog-template
		v-model="visibleUpdate"
		icon="mdi-update"
		:title="$t('update.title')"
		width="700"
        :persistent="!visibleLater"
		text
		actions
	>
		<template #body>
			<span>{{ $t("update.dialog." + (!rollback ? "updateTo" : "rollbackTo"), { version }) }}</span>
		</template>
		<template #btns>
			<v-btn color="primary" @click="onUpdateStart">
				{{ $t("update.btn." + (!rollback ? "update" : "rollback")) }}
			</v-btn>
			<v-btn v-if="visibleLater" color="primary" @click="onCancel">
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
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from "vue";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import store from "@/store";
import router from "@/router";
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { API_DEVICE_UPDATE_EVENT, API_DEVICE_UPDATE_EVENT_ERROR } from "@/models/pjcan/device";
import { API_VERSION_EVENT, IVersion } from "@/models/pjcan/version";

import { RemainingTime } from "@/utils/time";

export default {
	name: "UpdateFirmwareDialog",
	components: { DialogTemplate },
	props: {
		/** Показать диалог */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Версия прошивки */
		version: String,
		/** Откатит прошивки */
		rollback: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, rollback } = toRefs(props);
		const { t } = useI18n();

		const visibleUpdate = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const visibleProcess = ref(false);
		const visibleLater = computed((): boolean => (store.getters["config/version"] as IVersion).supported);
		const message = ref("");
		const progress = ref(0);
		const uploading = ref("");
		const timeLeft = ref("");

		watch(modelValue, (val: boolean): void =>
		{
			if (val)
			{
				visibleProcess.value = false;
				message.value = "";
				progress.value = 0;
				uploading.value = "";
				timeLeft.value = "";
			}
		});

		let remainingTime: RemainingTime | undefined;

		/** Событие запуска прошивки */
		const onUpdateStart = (): void =>
		{
			message.value = t("update.process.preparation");
			uploading.value = "";
			progress.value = 0;
			visibleUpdate.value = false;
			visibleProcess.value = true;
			canbus.updateStart();
		};

		/**
		 * Событие загрузки прошивки на устройство PJCAN
		 * @param {number} error Код ошибки
		 */
		const onUpdateStatus = (error: number) =>
		{
			if (error === 0)
			{
				if (canbus.update.offset < canbus.update.total)
				{
					message.value = t("update.process.upload");
					progress.value = canbus.update.uploading * 100;
					uploading.value = progress.value.toFixed(2) + "%";

					// подсчет оставшегося времени
					if (!remainingTime)
					{
						remainingTime = new RemainingTime(canbus.update.total);
					}
					else
					{
						remainingTime.offset = canbus.update.offset;
						timeLeft.value = remainingTime.get();
					}
				}
				else
				{
					message.value = t("update.process.update");
					progress.value = 0;
					uploading.value = "";

					remainingTime = undefined;
					timeLeft.value = "";

					canbus.version.clear();
					if (rollback.value) window.location.reload();
				}
			}
			else onErrorUpdate(t("update.notify.error"));
		};

		/** Завершение прошивки */
		const onCompletingFirmware = () =>
		{
			if (canbus.update.total > 0)
			{
				if (canbus.version.is)
				{
					canbus
						.checkVersion()
						.then(() => toast.error(t("update.notify.warning")))
						.catch(() => toast.success(t("update.notify.completed")));

					setTimeout(() => router.go(0), 5000);
					onCancel();
				}
				else canbus.bluetooth.disconnect();
			}
		};

		/** Отменить обновление */
		const onCancel = (): void =>
		{
			visibleUpdate.value = false;
			visibleProcess.value = false;
			canbus.update.clear();
		};

		/** Ошибка обновления */
		const onErrorUpdate = (msg: string): void =>
		{
			toast.error(msg);
			onCancel();
		};

		onMounted(() =>
		{
			canbus.addListener(API_VERSION_EVENT, onCompletingFirmware);
			canbus.update.addListener(API_DEVICE_UPDATE_EVENT, onUpdateStatus);
			canbus.addListener(API_DEVICE_UPDATE_EVENT_ERROR, onErrorUpdate);
		});

		onUnmounted(() =>
		{
			canbus.removeListener(API_VERSION_EVENT, onCompletingFirmware);
			canbus.update.removeListener(API_DEVICE_UPDATE_EVENT, onUpdateStatus);
			canbus.removeListener(API_DEVICE_UPDATE_EVENT_ERROR, onErrorUpdate);
		});

		return {
			visibleUpdate,
			visibleProcess,
			visibleLater,
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
