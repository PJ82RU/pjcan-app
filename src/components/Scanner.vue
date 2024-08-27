<template>
	<dialog-template
		v-model="visibleUploading"
		icon="mdi-cloud-upload-outline"
		:title="$t('scanner.upload.title')"
		text
	>
		<template #body>
			<div>{{ $t("scanner.upload.text") }}</div>
			<div class="mb-2">{{ $t("scanner.upload.leftToLoad", { n: leftUploading }) }}</div>

			<v-progress-linear color="primary" height="10" indeterminate stream rounded />
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import store from "@/store";
import canbus from "@/api/canbus";
import { setScanCan } from "@/api/google";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { IMessage } from "@/models/interfaces/message/IMessage";
import { API_DEVICE_SCANNER_VALUE_EVENT } from "@/models/pjcan/device";
import { toMac } from "@/utils/conversion";

export default {
	name: "Scanner",
	components: { DialogTemplate },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { t } = useI18n();

		const efuseMac = computed((): string => toMac(store.getters["config/info"].efuseMac));
		const visibleUploading = ref(false);
		const leftUploading = ref(0);
		const started = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		let scanUploading = false;
		let scanClose = false;

		watch(started, (val: boolean): void =>
		{
			if (
				!canbus.scanner(val, (success) =>
				{
					if (val && success)
					{
						// запускаем диалог
						scanClose = false;
						store.commit("app/clearMessages");
						steps();
					}
				})
			)
			{ toast.error(t("scanner.notify.errorStart")); }
		});

		/**
		 * Шаги
		 * @param {number} index Номер шага
		 */
		const steps = (index: number = 0): void =>
		{
			const step = "scanner.step." + index;
			const message = {
				title: t(step + ".title"),
				icon: "mdi-magnify-scan",
				text: t(step + ".text"),
				btns: [],
				width: "800px"
			} as IMessage;

			store.commit("value/setScannerBufferTitle", message.title);

			if (index < 4)
			{
				message.btns?.push({
					title: t("scanner.btn.next"),
					on: () =>
					{
						index++;
						setTimeout(() => steps(index), 400);
					}
				});
				message.btns?.push({
					title: t("btn.cancel"),
					icon: "mdi-close",
					on: () =>
					{
						started.value = false;
						scanClose = true;
					}
				});
			}
			else
			{
				message.btns?.push({
					title: t("scanner.btn.finish"),
					on: () =>
					{
						started.value = false;
						if (leftUploading.value) setTimeout(() => (visibleUploading.value = true), 400);
						else toast.warning(t("scanner.notify.warningSend"));
					}
				});
			}

			store.commit("app/setMessage", message);
		};

		/** Отправка буфера */
		const sendScannerBuffer = (): void =>
		{
			if (scanUploading) return;

			leftUploading.value = store.getters["value/scannerBuffer"].length;
			if (!leftUploading.value)
			{
				if (started.value) toast.warning(t("scanner.notify.warningSend"));
				visibleUploading.value = false;
				return;
			}

			scanUploading = true;
			setScanCan({ mac: efuseMac.value, rows: store.getters["value/scannerBufferRead"] })
				.then((res: any) =>
				{
					store.commit("value/nextScannerBuffer", -1);
					if (res?.success && !scanClose) setTimeout(() => sendScannerBuffer(), 100);
					else if (res?.error) toast.error(res?.message);
				})
				.catch(() => toast.error(t("scanner.notify.errorSend")))
				.finally(() =>
				{
					scanUploading = false;
				});
		};
		canbus.addListener(API_DEVICE_SCANNER_VALUE_EVENT, () => sendScannerBuffer());

		return {
			visibleUploading,
			started,
			leftUploading
		};
	}
};
</script>
