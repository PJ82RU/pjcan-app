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

import { IMessage } from "@/models/interfaces/message/IMessage";
import { IScannerFrame } from "@/models/pjcan/scanner/IScannerFrame";
import { IScanCanRow } from "@/models/interfaces/IScanCanRow";

import {
	API_SCANNER_CONFIG_EXEC,
	API_SCANNER_VALUE_EVENT,
	API_SCANNER_VALUE_EXEC,
	IScannerValue,
	ScannerValue
} from "@/models/pjcan/scanner";

import { setScanCan } from "@/api/google";

import { toHex, toMac } from "@/utils/conversion";
import DialogTemplate from "@/layout/components/DialogTemplate.vue";

export default {
	name: "Scanner",
	components: { DialogTemplate },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { t } = useI18n();

		let startedFetchValue: number | undefined;
		let scannerValue: IScannerValue | undefined;
		const scannerBuffer: IScanCanRow[] = [];
		let efuseMac: string = "";
		let scanUploading = false;
		let scanClose = false;

		const visibleUploading = ref(false);
		const leftUploading = ref(0);
		const started = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});

		watch(started, (val: boolean): void =>
		{
			if (val)
			{
				if (!canbus.bluetooth.connected)
				{
					toast.error(t("scanner.notify.errorStart"));
					return;
				}

				// запоминаем состояние FetchValue
				startedFetchValue = canbus.startedFetchValue;
				canbus.stopFetchValue();

				// включаем сканирование
				canbus.scanner.enabled = true;
				if (canbus.queryConfig(API_SCANNER_CONFIG_EXEC))
				{
					efuseMac = toMac(canbus.deviceInfo.efuseMac);
					scanClose = false;

					// запускаем циклический запрос значений сканирования
					scannerValue = new ScannerValue();
					canbus.startFetchValue(API_SCANNER_VALUE_EXEC, scannerValue);
					canbus.addListener(API_SCANNER_VALUE_EVENT, onReceiveValue);
					// запускаем диалог
					store.commit("app/clearMessages");
					steps();
				}
			}
			else
			{
				if (scannerValue)
				{
					// останавливаем циклический запрос значений сканирования
					canbus.removeListener(API_SCANNER_VALUE_EVENT, onReceiveValue);
					canbus.stopFetchValue();
					scannerValue = undefined;
					// выключаем сканирование
					canbus.scanner.enabled = false;
					canbus.queryConfig(API_SCANNER_CONFIG_EXEC);
				}

				if (startedFetchValue !== undefined)
				{
					// восстанавливаем состояние FetchValue
					canbus.startFetchValue(startedFetchValue);
					startedFetchValue = undefined;
				}
			}
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
						setTimeout(() => (visibleUploading.value = true), 400);
					}
				});
			}

			store.commit("app/setMessage", message);
		};

		/** Входящие значения сканирования */
		const onReceiveValue = (res: IScannerValue): void =>
		{
			if (res.isData && res.count > 0)
			{
				scannerBuffer.push(
					...res.frames.slice(0, res.count).map(
						(x: IScannerFrame) =>
							({
								timestamp: Number(x.timestamp),
								hexId: "0x" + toHex(x.id),
								hexData: "0x" + x.data.map((x) => toHex(x)).join(":")
							} as IScanCanRow)
					)
				);
				sendScannerBuffer();
			}
		};

		/** Отправка буфера */
		const sendScannerBuffer = (): void =>
		{
			if (scanUploading) return;
			if (!scannerBuffer.length)
			{
				if (started.value) toast.warning(t("scanner.notify.warningSend"));
				visibleUploading.value = false;
				return;
			}

			scanUploading = true;
			leftUploading.value = scannerBuffer.length;
			setScanCan({ mac: efuseMac, rows: scannerBuffer.splice(0, 32) })
				.then((res: any) =>
				{
					if (res?.success && !scanClose) setTimeout(() => sendScannerBuffer(), 100);
					else if (res?.error) toast.error(res?.message);
				})
				.catch(() => toast.error(t("scanner.notify.errorSend")))
				.finally(() =>
				{
					scanUploading = false;
				});
		};

		return {
			visibleUploading,
			started,
			leftUploading
		};
	}
};
</script>
