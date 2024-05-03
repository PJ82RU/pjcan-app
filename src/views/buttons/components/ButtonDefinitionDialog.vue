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
						:model-value="valueResistance"
						:label="$t('buttons.resistance.cur.title')"
						:hint="$t('buttons.resistance.cur.description')"
						readonly
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="id"
						:label="$t('buttons.definition.type.title')"
						:items="types"
						:hint="$t('buttons.definition.type.description')"
						variant="underlined"
						item-title="title"
						item-value="id"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="resistanceMin"
						:label="$t('buttons.resistance.min.title')"
						:hint="$t('buttons.resistance.min.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="resistanceMax"
						:label="$t('buttons.resistance.max.title')"
						:hint="$t('buttons.resistance.max.description')"
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
		/** Список типов/наименований кнопок */
		types: {
			type: Array as () => IButtonCard[],
			required: true
		},
		/** ID нажатой кнопки */
		valueId: Number,
		/** Сопротивление нажатой кнопки */
		valueResistance: Number
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, types, valueId } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});

		const id = ref(undefined as number | undefined);
		const resistanceMin = ref(0);
		const resistanceMax = ref(0);
		const disabled = computed(() => id.value === undefined);

		watch(modelValue, () =>
		{
			id.value = valueId.value;
			const selectedType = types.value?.find((x: IButtonCard) => x.id === id.value);
			resistanceMin.value = selectedType?.config?.resistanceMin ?? 0;
			resistanceMax.value = selectedType?.config?.resistanceMax ?? 0;
		});

		/** Применить */
		const onApplyClick = () =>
		{
			visible.value = false;
			emit("click:apply", id.value, resistanceMin.value, resistanceMax.value);
		};

		return {
			visible,
			types,
			id,
			resistanceMin,
			resistanceMax,
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
