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
						v-model="configShowDays"
						:title="
							$t('onboard.engine.settings.showDays.' + ($vuetify.display.xs ? 'titleShort' : 'title'))
						"
						:description="$t('onboard.engine.settings.showDays.description')"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="configTotalWorktime"
						:label="$t('onboard.engine.settings.worktime.title')"
						:hint="$t('onboard.engine.settings.worktime.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="configTotalCountRPM"
						:label="$t('onboard.engine.settings.countRPM.title')"
						:hint="$t('onboard.engine.settings.countRPM.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="onResetClick">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="onApplyClick">
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
import { computed, ref, toRefs, watch } from "vue";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";

export default {
	name: "EngineConfig",
	components: { DialogTemplate, SwitchCardItem, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Показывать дни в моточасах */
		showDays: Boolean,
		/** Счетчик моточасов, сек. */
		totalWorktime: Number,
		/** Счетчик коленчатого вала (RPM), об. */
		totalCountRPM: Number,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, context: any)
	{
		const { modelValue, showDays, totalWorktime, totalCountRPM } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const configShowDays = ref(true);
		const configTotalWorktime = ref(0);
		const configTotalCountRPM = ref(0);

		watch(visible, val =>
		{
			if (val)
			{
				configShowDays.value = showDays.value ?? false;
				configTotalWorktime.value = totalWorktime.value ?? 0;
				configTotalCountRPM.value = totalCountRPM.value ?? 0;
			}
		});

		/** Сбросить */
		const onResetClick = (): void =>
		{
			configShowDays.value = true;
			configTotalWorktime.value = 0;
			configTotalCountRPM.value = 0;
		};
		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			context.emit("click:apply", {
				showDays: configShowDays.value,
				totalWorktime: configTotalWorktime.value,
				totalCountRPM: configTotalCountRPM.value
			});
		};

		return {
			visible,
			configShowDays,
			configTotalWorktime,
			configTotalCountRPM,
			onResetClick,
			onApplyClick
		};
	}
};
</script>
