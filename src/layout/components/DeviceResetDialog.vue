<template>
	<dialog-template
		content-class="device-reset"
		v-model="visible"
		:title="$t('deviceReset.title')"
		icon="mdi-restart"
		width="600px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0">
					<v-checkbox v-model="resetConfig" :label="$t('deviceReset.config')" hide-details />
				</v-col>
				<v-col cols="12" class="pt-1">
					<v-checkbox v-model="resetView" :label="$t('deviceReset.view')" hide-details />
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="onApply">
				{{ $t("btn.apply") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.cancel") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "vue";

import DialogTemplate from "@/components/DialogTemplate.vue";
import canbus from "@/api/canbus";
import router from "@/router";

export default {
	name: "DeviceResetDialog",
	components: { DialogTemplate },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, context: any)
	{
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const resetConfig = ref(false);
		const resetView = ref(false);

		/** Применить */
		const onApply = (): void =>
		{
			canbus.device.config.reboot = true;
			canbus.device.config.resetConfig = resetConfig.value;
			canbus.device.config.resetView = resetView.value;
			canbus.queryDevice(true);
			visible.value = false;
			setTimeout(() => router.go(0), 5000);
		};

		return {
			visible,
			resetConfig,
			resetView,
			onApply
		};
	}
};
</script>
