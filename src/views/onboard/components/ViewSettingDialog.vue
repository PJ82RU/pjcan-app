<template>
	<dialog-template
		v-model="visible"
		content-class="view-setting-dialog"
		icon="lcd"
		:title="title"
		width="550px"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="modelEnabled"
						:title="$t('onboard.viewSetting.enabled.title')"
						:description="$t('onboard.viewSetting.enabled.description')"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelType"
						:label="$t('onboard.viewSetting.type.title')"
						:items="typeItems"
						:hint="$t('onboard.viewSetting.type.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="modelTime"
						:label="$t('onboard.viewSetting.time.title')"
						:hint="$t('onboard.viewSetting.time.description')"
						:disabled="disabled"
						:min="1"
						:max="300"
					/>
				</v-col>
			</v-row>
		</template>
		<template #btns>
			<v-btn color="primary" prepend-icon="mdi-check" @click="onApplyClick" :disabled="disabled">
				{{ $t("btn.apply") }}
			</v-btn>
			<v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";
import { IViewConfig } from "@/models/pjcan/view";

export default {
	name: "ViewSettingDialog",
	components: { DialogTemplate, SwitchCardItem, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Заголовок */
		title: {
			type: String,
			require: true
		},
		/** Вкл/выкл. отображения на LCD */
		enabled: Boolean,
		/** Тип вывода текста на LCD */
		type: Number,
		/** Время отображения текста на LCD, сек */
		time: Number,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, enabled, type, time } = toRefs(props);
		const { tm } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const modelEnabled = ref(false);
		const modelType = ref(0);
		const typeItems = computed(() =>
			(tm("onboard.viewSetting.type.items") as string[])?.map((x, i) => ({
				label: x,
				value: i
			}))
		);
		const modelTime = ref(3);

		watch(visible, val =>
		{
			if (val)
			{
				modelEnabled.value = enabled.value ?? false;
				modelType.value = type.value ?? 0;
				modelTime.value = time.value ?? 3;
			}
		});

		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			emit("click:apply", {
				enabled: modelEnabled.value,
				type: modelType.value,
				time: modelTime.value
			} as IViewConfig);
		};

		return {
			visible,
			modelEnabled,
			modelType,
			typeItems,
			modelTime,
			onApplyClick
		};
	}
};
</script>

<style lang="scss" scoped>
.view-setting-dialog {
	max-width: 400px;
}
</style>
