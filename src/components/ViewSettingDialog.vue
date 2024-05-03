<template>
	<dialog-template
		v-model="visible"
		content-class="view-setting-dialog"
		icon="lcd"
		:title="title"
		width="440px"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="viewEnabled"
						:title="$t('onboard.viewSetting.enabled.title')"
						:description="$t('onboard.viewSetting.enabled.description')"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="viewType"
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
						v-model="viewTime"
						:label="$t('onboard.viewSetting.time.title')"
						:hint="$t('onboard.viewSetting.time.description')"
						:disabled="disabled"
						:min="1"
						:max="300"
					/>
				</v-col>
				<v-col v-if="!delayDisabled" cols="12" class="pt-0">
					<number-field
						v-model="viewDelay"
						:label="$t('onboard.viewSetting.delay.title')"
						:hint="$t('onboard.viewSetting.delay.description')"
						:disabled="disabled"
						:min="0"
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
			required: true
		},
		/** Заголовок */
		title: String,
		/** Параметры отображения */
		view: Object as () => IViewConfig,
		/** Не показывать "Время паузы отображения" */
		delayDisabled: Boolean,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, view, delayDisabled } = toRefs(props);
		const { tm } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const viewEnabled = ref(false);
		const viewType = ref(0);
		const typeItems = computed(() =>
			(tm("onboard.viewSetting.type.items") as string[])?.map((x, i) => ({
				label: x,
				value: i
			}))
		);
		const viewTime = ref(3);
		const viewDelay = ref(3);

		watch(visible, val =>
		{
			if (val)
			{
				viewEnabled.value = view.value.enabled ?? false;
				viewType.value = view.value.type ?? 0;
				viewTime.value = view.value.time ?? 3;
				viewDelay.value = !delayDisabled.value ? view.value.delay ?? 3 : 0;
			}
		});

		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			emit("click:apply", {
				exec: view.value.exec,
				enabled: viewEnabled.value,
				type: viewType.value,
				time: viewTime.value,
				delay: viewDelay.value
			});
		};

		return {
			visible,
			viewEnabled,
			viewType,
			typeItems,
			viewTime,
			viewDelay,
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
