<template>
	<dialog-template
		v-model="visible"
		content-class="button-edit-dialog"
		icon="mdi-plus-box"
		:title="title"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12" style="overflow: hidden">
					<multi-range
						:points="list"
						:min="SW1_CONFIG_RESISTANCE_MIN()"
						:max="SW1_CONFIG_RESISTANCE_MAX()"
						:number-of-ticks="51"
						:select-point="resist"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-card-item
						:model-value="beginResistance"
						:title="$t('buttons.edit.beginValue.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('buttons.edit.beginValue.description')"
						:min="minResistance"
						:max="maxResistance"
						:step="20"
						disabled
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-card-item
						v-model="resist"
						:title="$t('buttons.edit.endValue.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('buttons.edit.endValue.description')"
						:min="minResistance"
						:max="maxResistance"
						:step="20"
					/>
				</v-col>
			</v-row>
		</template>
		<template #btns>
			<v-btn color="primary" @click="reset" :disabled="resist === resistance">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="apply" :disabled="resist === resistance">
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
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import MultiRange from "@/components/MultiRange.vue";
import NumberCardItem from "@/components/cards/NumberCardItem.vue";

import { SW1_CONFIG_RESISTANCE_MAX, SW1_CONFIG_RESISTANCE_MIN } from "@/models/pjcan/buttons";

export default {
	name: "ButtonEditDialog",
	methods: {
		SW1_CONFIG_RESISTANCE_MAX()
		{
			return SW1_CONFIG_RESISTANCE_MAX;
		},
		SW1_CONFIG_RESISTANCE_MIN()
		{
			return SW1_CONFIG_RESISTANCE_MIN;
		}
	},
	components: { DialogTemplate, MultiRange, NumberCardItem },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Наименование кнопки */
		name: {
			type: String,
			default: "Тест"
		},
		/** Сопротивление */
		resistance: {
			type: Number,
			default: 0
		},
		/** Список сопротивлений */
		listOfResistance: {
			type: Array as () => number[],
			default: () => []
		}
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, name, resistance, listOfResistance } = toRefs(props);
		const { t } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const title = computed((): string => t("buttons.edit.title", { name: name.value }));

		const list = ref([...listOfResistance.value]);
		watch(listOfResistance, (val) => (list.value = [...val]));

		const indexList = computed(
			(): number => listOfResistance.value?.findIndex((r: number) => r === resistance.value) ?? 0
		);
		const minResistance = computed((): number => (indexList.value > 0 ? list.value[indexList.value - 1] + 20 : 20));
		const maxResistance = computed((): number =>
			indexList.value < listOfResistance.value?.length - 1
				? listOfResistance.value[indexList.value + 1] - 20
				: SW1_CONFIG_RESISTANCE_MAX
		);
		const resist = computed({
			get: (): number => list.value[indexList.value],
			set: (val: number): void =>
			{
				list.value[indexList.value] = val;
			}
		});
		const beginResistance = computed((): number => (indexList.value > 0 ? list.value[indexList.value - 1] + 1 : 1));

		/** Сбросить изменения */
		const reset = () =>
		{
			list.value = [...listOfResistance.value];
		};
		/** Применить изменения */
		const apply = () =>
		{
			visible.value = false;
			emit("click:apply", list.value);
		};

		return {
			visible,
			title,
			list,
			resist,
			indexList,
			minResistance,
			maxResistance,
			beginResistance,
			reset,
			apply
		};
	}
};
</script>
