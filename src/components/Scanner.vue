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
import moment from "moment";
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import store from "@/store";

import canbus from "@/api/canbus";

import { IMessage } from "@/models/interfaces/message/IMessage";
import { IDeviceScannerFrame } from "@/models/pjcan/device/IDeviceScannerFrame";
import { IScanCanRow } from "@/models/interfaces/IScanCanRow";
import {
	API_DEVICE_SCANNER_VALUE_EVENT,
	DeviceScannerAction,
	DeviceScannerValue,
	IDeviceScannerValue
} from "@/models/pjcan/device";

import { setScanCan } from "@/api/google";

import { toHex, toMac } from "@/utils/conversion";
import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import { Timeout } from "@/models/types/Timeout";

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

		const scannerAction = new DeviceScannerAction();
		const scannerValue: IDeviceScannerValue = new DeviceScannerValue();
		let scannerInterval: Timeout;
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

				// включаем сканирование
				canbus.queueDisabled = true;
				scannerAction.enabled = true;
				canbus.query(scannerAction, false, (success) =>
				{
					if (success)
					{
						efuseMac = toMac(canbus.device.info.efuseMac);
						scanClose = false;

						// запускаем циклический запрос значений сканирования
						scannerInterval = setInterval(() => canbus.query(scannerValue), 500);
						canbus.addListener(API_DEVICE_SCANNER_VALUE_EVENT, onReceiveValue);
						// запускаем диалог
						store.commit("app/clearMessages");
						steps();
					}
				});
			}
			else
			{
				if (scannerValue)
				{
					// останавливаем циклический запрос значений сканирования
					canbus.removeListener(API_DEVICE_SCANNER_VALUE_EVENT, onReceiveValue);
					clearInterval(scannerInterval);
					// выключаем сканирование
					scannerAction.enabled = false;
					canbus.query(scannerAction);
					canbus.queueDisabled = false;
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

			scannerBuffer.push({
				datetime: message.title,
				time: "",
				hexId: "",
				hexData: ""
			} as IScanCanRow);

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
		const onReceiveValue = (res: IDeviceScannerValue): void =>
		{
			if (res.isData && res.count > 0)
			{
				scannerBuffer.push(
					...res.frames.slice(0, res.count).map((x: IDeviceScannerFrame) =>
					{
						const mm = moment.duration(Number(x.timestamp), "milliseconds");
						const mm_time = {
							hours: mm.hours(),
							minutes: mm.minutes(),
							seconds: mm.seconds(),
							milliseconds: mm.milliseconds()
						};
						return {
							datetime: moment().format("YYYY.MM.DD HH:mm:ss"),
							time:
								mm_time.hours + ":" +
								(mm_time.minutes < 10 ? "0" : "") + mm.minutes() + ":" +
								(mm_time.seconds < 10 ? "0" : "") + mm.seconds() + "." +
								(mm_time.milliseconds < 10 ? "00" : mm_time.milliseconds < 100 ? "0" : "") + mm.milliseconds(),
							hexId: "0x" + toHex(x.id),
							hexData: "0x" + x.data.map((x) => toHex(x)).join(":")
						} as IScanCanRow;
					})
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
			setScanCan({ mac: efuseMac, rows: scannerBuffer.splice(0, 30) })
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
