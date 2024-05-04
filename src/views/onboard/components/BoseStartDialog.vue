<template>
	<dialog-template
		content-class="bose-start"
		v-model="visible"
		:title="$t('onboard.bose.volumeConfig.title')"
		icon="volume-setting"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="valueEnabled"
						:title="$t('onboard.bose.volumeConfig.start.title')"
						:description="$t('onboard.bose.volumeConfig.start.description')"
					/>
				</v-col>
                <v-col cols="12" class="pb-0">
                    <slider-card-item
                        v-model="valueLevel"
                        :title="$t('onboard.bose.volumeConfig.level.title')"
                        :description="$t('onboard.bose.volumeConfig.level.description')"
                        :max="63"
                        :disabled="!valueEnabled"
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
import SliderCardItem from "@/components/cards/SliderCardItem.vue";

export default {
	name: "BoseStartDialog",
	components: { SliderCardItem, DialogTemplate, SwitchCardItem, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Вкл/выкл */
		enabled: Boolean,
		/** Уровень звука */
		level: Number
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, context: any)
	{
		const { modelValue, enabled, level } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const valueEnabled = ref(false);
		const valueLevel = ref(0);

		/** Сбросить */
		const onResetClick = (): void =>
		{
			valueEnabled.value = enabled.value;
			valueLevel.value = level.value;
			if (valueLevel.value > 63) valueLevel.value = 63;
		};
		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			if (valueEnabled.value !== enabled.value || valueLevel.value !== level.value)
			{
				context.emit("click:apply", valueEnabled.value, valueLevel.value);
			}
		};

		watch(visible, (val) =>
		{
			if (val) onResetClick();
		});

		return {
			visible,
			valueEnabled,
			valueLevel,
			onResetClick,
			onApplyClick
		};
	}
};
</script>
