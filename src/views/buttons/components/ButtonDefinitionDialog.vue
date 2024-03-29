<template>
	<dialog-template
		v-model="visible"
		content-class="button-definition-dialog"
		icon="mdi-gesture-tap-button"
		:title="$t('buttons.definition.title')"
		width="550px"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12">
					<number-field
						:model-value="resistance"
						:label="$t('buttons.resistance.title')"
						:hint="$t('buttons.resistance.description')"
						:min="1"
						:max="3999"
						readonly
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelType"
						:label="$t('buttons.definition.type.title')"
						:items="list"
						:hint="$t('buttons.definition.type.description')"
						variant="underlined"
						item-title="title"
						item-value="type"
						persistent-hint
					/>
				</v-col>
			</v-row>
		</template>
		<template #btns>
			<v-btn color="primary" @click="onApplyClick" :disabled="disabled">
				{{ $t("btn.apply") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.cancel") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import NumberField from "@/components/common/NumberField.vue";

import { TButtonItem } from "@/models/pjcan/button";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

export default {
	name: "ButtonDefinitionDialog",
	components: { DialogTemplate, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Список типов кнопок */
		list: {
			type: Array as () => IButtonCard[],
			required: true
		},
		/** Сопротивление кнопки */
		resistance: Number,
		type: Number as () => TButtonItem
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, type } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});

		const modelType = ref(undefined);
		const disabled = computed(() => modelType.value === undefined);

		watch(visible, (val) =>
		{
			if (val) modelType.value = type.value >= 0 ? type.value : undefined;
		});

		/** Применить */
		const onApplyClick = () =>
		{
			visible.value = false;
			emit("click:apply", modelType.value);
		};

		return {
			visible,
			modelType,
			disabled,
			onApplyClick
		};
	}
};
</script>

<style lang="scss" scoped>
.button-definition-dialog {
	max-width: 400px;
}
</style>
