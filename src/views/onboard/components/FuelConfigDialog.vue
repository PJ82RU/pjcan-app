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
						v-model="configRatio"
						:label="$t('onboard.fuel.settings.ratio.title')"
						:hint="$t('onboard.fuel.settings.ratio.description')"
						:min="0"
						:max="1"
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
	name: "FuelConfigDialog",
	components: { DialogTemplate, SwitchCardItem, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Коэффициент 0.001 до 1 */
		ratio: Number,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, context: any)
	{
		const { modelValue, ratio } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const configRatio = ref(0);

		watch(visible, val =>
		{
			if (val) configRatio.value = ratio.value ?? 1;
		});

		/** Сбросить */
		const onResetClick = (): void =>
		{
			configRatio.value = 1;
		};
		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			context.emit("click:apply", {
				ratio: configRatio.value
			});
		};

		return {
			visible,
			configRatio,
			onResetClick,
			onApplyClick
		};
	}
};
</script>
