<template>
	<dialog-template
		content-class="device-reset"
		v-model="visible"
		:title="$t('onboard.engine.settings.title')"
		icon="engine-statistic"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showDays"
						:title="
							$t('onboard.engine.settings.showDays.' + ($vuetify.display.xs ? 'titleShort' : 'title'))
						"
						:description="$t('onboard.engine.settings.showDays.description')"
						:disabled="!loaderConfigEngine"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="worktime"
						:label="$t('onboard.engine.settings.worktime.title')"
						:hint="$t('onboard.engine.settings.worktime.description')"
						:min="0"
						:disabled="!loaderConfigEngine"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="totalCountRPM"
						:label="$t('onboard.engine.settings.countRPM.title')"
						:hint="$t('onboard.engine.settings.countRPM.description')"
						:min="0"
						:disabled="!loaderConfigEngine"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="onReset">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="onApply">
				<v-icon v-if="$vuetify.display.xs">mdi-check</v-icon>
				<span v-else> {{ $t("btn.apply") }} </span>
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				<v-icon v-if="$vuetify.display.xs">mdi-close</v-icon>
				<span v-else> {{ $t("btn.cancel") }} </span>
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";

import DialogTemplate from "@/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";

import {
	API_VARIABLE_ENGINE_CONFIG_EXEC,
	API_VARIABLE_ENGINE_CONFIG_EVENT,
	IEngineConfig
} from "@/models/pjcan/variables/engine";

import canbus from "@/api/canbus";

export default {
	name: "EngineConfig",
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

		const loaderConfigEngine = ref(false);
		const showDays = ref(false);
		const worktime = ref(0);
		const totalCountRPM = ref(0);

		const onReceiveConfigEngine = (res: IEngineConfig): void =>
		{
			loaderConfigEngine.value = res.isData;
			if (res.isData)
			{
				showDays.value = res.showDays;
				worktime.value = res.totalSeconds > 0 ? res.totalSeconds / 60 : 0;
				totalCountRPM.value = res.totalCountRPM;
			}
		};

		/** Сбросить */
		const onReset = (): void =>
		{
			const { engine } = canbus.configs.variable;
			engine.showDays = showDays.value;
			engine.totalSeconds = 0;
			engine.totalCountRPM = 0;
			canbus.queryConfig(API_VARIABLE_ENGINE_CONFIG_EXEC);
			visible.value = false;
		};

		/** Применить */
		const onApply = (): void =>
		{
			const { engine } = canbus.configs.variable;
			engine.showDays = showDays.value;
			engine.totalSeconds = worktime.value * 60;
			engine.totalCountRPM = totalCountRPM.value;
			canbus.queryConfig(API_VARIABLE_ENGINE_CONFIG_EXEC);
			visible.value = false;
		};

		onMounted(() =>
		{
			canbus.addListener(API_VARIABLE_ENGINE_CONFIG_EVENT, onReceiveConfigEngine);
			onReceiveConfigEngine(canbus.configs.variable.engine);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_VARIABLE_ENGINE_CONFIG_EVENT, onReceiveConfigEngine);
		});

		return {
			visible,
			loaderConfigEngine,
			showDays,
			worktime,
			totalCountRPM,
			onReset,
			onApply
		};
	}
};
</script>
