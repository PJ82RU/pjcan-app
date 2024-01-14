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
						v-model="modelShowDays"
						:title="
							$t('onboard.engine.settings.showDays.' + ($vuetify.display.xs ? 'titleShort' : 'title'))
						"
						:description="$t('onboard.engine.settings.showDays.description')"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="modelTotalWorktime"
						:label="$t('onboard.engine.settings.worktime.title')"
						:hint="$t('onboard.engine.settings.worktime.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="modelTotalCountRPM"
						:label="$t('onboard.engine.settings.countRPM.title')"
						:hint="$t('onboard.engine.settings.countRPM.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="onReset">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="$emit('apply')">
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
import { computed, toRefs } from "vue";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";

export default {
	name: "EngineConfig",
	components: { DialogTemplate, SwitchCardItem, NumberField },
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		showDays: {
			type: Boolean,
			default: false
		},
		totalWorktime: {
			type: Number,
			default: 0
		},
		totalCountRPM: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue", "update:showDays", "update:totalWorktime", "update:totalCountRPM", "apply"],
	setup(props: any, context: any)
	{
		const { modelValue, showDays, totalWorktime, totalCountRPM } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const modelShowDays = computed({
			get: (): boolean => showDays.value,
			set: (val: boolean): void => context.emit("update:showDays", val)
		});
		const modelTotalWorktime = computed({
			get: (): number => totalWorktime.value,
			set: (val: number): void => context.emit("update:totalWorktime", val)
		});
		const modelTotalCountRPM = computed({
			get: (): number => totalCountRPM.value,
			set: (val: number): void => context.emit("update:totalCountRPM", val)
		});

		/** Сбросить */
		const onReset = (): void =>
		{
			modelShowDays.value = true;
			modelTotalWorktime.value = 0;
			modelTotalCountRPM.value = 0;
		};

		return {
			visible,
			modelShowDays,
			modelTotalWorktime,
			modelTotalCountRPM,
			onReset
		};
	}
};
</script>
