<template />

<script lang="ts">
import { computed, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import store from "@/store";

import { IMessage } from "@/models/interfaces/message/IMessage";

import { API_SCANNER_CONFIG_EXEC, API_SCANNER_VALUE_EXEC, IScannerValue, ScannerValue } from "@/models/pjcan/scanner";

import canbus from "@/api/canbus";

export default {
	name: "Scanner",
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
				canbus.queryConfig(API_SCANNER_CONFIG_EXEC).then(() =>
				{
					// запускаем циклический запрос значений сканирования
					scannerValue = new ScannerValue();
					canbus.startFetchValue(API_SCANNER_VALUE_EXEC, scannerValue);
					// запускаем диалог
					steps();
				});

				store.commit("app/clearMessages");
			}
			else
			{
				if (scannerValue)
				{
					// останавливаем циклический запрос значений сканирования
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
					}
				});
			}
			else
			{
				message.btns?.push({ title: t("scanner.btn.finish") });
			}

			store.commit("app/setMessage", message);
		};

		return {
			started
		};
	}
};
</script>
