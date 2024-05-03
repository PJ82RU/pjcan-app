<template>
	<dialog-template
		v-model="visible"
		content-class="button-edit-dialog"
		icon="mdi-plus-box"
		:title="$t(name?.length ? 'buttons.edit' : 'buttons.adding')"
		width="550px"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="modelName"
						:label="$t('buttons.name')"
						variant="underlined"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelPress"
						:label="$t('buttons.pressSingle.title')"
						:items="functionsList"
						:hint="$t('buttons.pressSingle.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="modelResistanceMin"
						:label="$t('buttons.resistance.min.title')"
						:hint="$t('buttons.resistance.min.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="modelResistanceMax"
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
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import NumberField from "@/components/common/NumberField.vue";
import { TButtonExec } from "@/models/pjcan/buttons";

export default {
	name: "ButtonEditDialog",
	components: { DialogTemplate, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Наименование кнопки */
		name: {
			type: String,
			default: ""
		},
		/** Функция нажатой кнопки */
		press: {
			type: Number,
			default: 0
		},
		/** Сопротивление нажатой кнопки */
		valueResistance: {
			type: Number,
			default: 0
		},
		/** Минимальное сопротивление */
		resistanceMin: {
			type: Number,
			default: 0
		},
		/** Максимальное сопротивление */
		resistanceMax: {
			type: Number,
			default: 0
		}
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, name, press, valueResistance, resistanceMin, resistanceMax } = toRefs(props);
		const { tm } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const modelName = ref("");
		const modelPress = ref(TButtonExec.BUTTON_EXEC_NONE);
		const modelResistanceMin = ref(0);
		const modelResistanceMax = ref(0);
		const disabled = computed(
			(): boolean =>
				!(
					modelName.value?.length > 0 &&
					modelPress.value > 0 &&
					modelResistanceMin.value < modelResistanceMax.value
				)
		);
		watch(modelValue, (val: boolean) =>
		{
			if (val)
			{
				modelName.value = name.value;
				modelPress.value = press.value as TButtonExec;
				modelResistanceMin.value = resistanceMin.value;
				modelResistanceMax.value = resistanceMax.value;

				if (modelResistanceMin.value === 0 && modelResistanceMax.value === 0)
				{
					modelResistanceMin.value = valueResistance.value - 150;
					if (modelResistanceMin.value < 0) modelResistanceMin.value = 0;
					modelResistanceMax.value = valueResistance.value + 150;
				}
			}
		});

		/** Применить */
		const onApplyClick = () =>
		{
			visible.value = false;
			emit("click:apply", modelName.value, modelPress.value, modelResistanceMin.value, modelResistanceMax.value);
		};

		/** Список функций */
		const functionsList = computed((): object[] =>
		{
			const list: any = tm("buttons.functions");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		return {
			visible,
			disabled,
			modelName,
			modelPress,
			modelResistanceMin,
			modelResistanceMax,
			functionsList,
			onApplyClick
		};
	}
};
</script>
