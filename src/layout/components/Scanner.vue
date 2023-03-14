<template />

<script lang="ts">
import { computed, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import { IMessage } from "@/models/interfaces/message/IMessage";

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

		const started = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});

		watch(started, (val: boolean): void =>
		{
			if (val)
			{
				store.commit("app/clearMessages");
				setTimeout(() => steps(), 400);
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
				message.btns?.push({ title: t("btn.cancel"), icon: "mdi-close" });
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
