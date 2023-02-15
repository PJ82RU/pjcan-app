<template>
	<dialog-template
		content-class="device-reset"
		v-model="visible"
		:title="$t('onboard.fuel.settings.title')"
		icon="engine-statistic"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="ratio"
						:label="$t('onboard.fuel.settings.ratio.title')"
						:hint="$t('onboard.fuel.settings.ratio.description')"
						:min="0"
						:max="1"
						:disabled="!loaderConfigFuel"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="onReset">
				{{ $t("btn.reset") }}
			</v-btn>
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
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";

import DialogTemplate from "@/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";

import canbus, { API_EVENT_VARIABLE_FUEL_CONFIG } from "@/api/canbus";

import { API_EXEC_VARIABLE_FUEL_CONFIG, IFuelConfig } from "@/models/pjcan/variables/fuel";

export default {
	name: "FuelConfigDialog",
	components: { DialogTemplate, SwitchCardItem, NumberField },
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

		const loaderConfigFuel = ref(false);
		const ratio = ref(0);

		const onReceiveConfigFuel = (res: IFuelConfig): void =>
		{
			loaderConfigFuel.value = res.isData;
			if (res.isData)
			{
				ratio.value = res.ratio / 1000;
			}
		};

		/** Сбросить */
		const onReset = (): void =>
		{
			canbus.configs.variable.fuel.ratio = 1000;
			canbus.queryConfig(API_EXEC_VARIABLE_FUEL_CONFIG);
			visible.value = false;
		};

		/** Применить */
		const onApply = (): void =>
		{
			canbus.configs.variable.fuel.ratio = ratio.value * 1000;
			canbus.queryConfig(API_EXEC_VARIABLE_FUEL_CONFIG);
			visible.value = false;
		};

		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_FUEL_CONFIG, onReceiveConfigFuel);
			onReceiveConfigFuel(canbus.configs.variable.fuel);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_FUEL_CONFIG, onReceiveConfigFuel);
		});

		return {
			visible,
			loaderConfigFuel,
			ratio,
			onReset,
			onApply
		};
	}
};
</script>
