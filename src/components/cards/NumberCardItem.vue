<template>
	<v-row class="number-card-item">
		<v-col cols="6" class="pt-0 pr-0">
			<v-text-field
				class="number-card-item__label"
				:model-value="title"
				:hint="description"
				variant="underlined"
				density="compact"
				persistent-hint
				readonly
				dense
				:disabled="disabled"
			/>
		</v-col>
		<v-col cols="6" class="pt-0 pl-0">
			<v-number-input
				class="number-card-item__number"
				v-model="value"
				:min="min"
				:max="max"
				:step="step"
				control-variant="split"
				variant="underlined"
				density="compact"
				dense
				:disabled="disabled"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { VNumberInput } from "vuetify/labs/VNumberInput";
import { computed, toRefs } from "vue";

export default {
	name: "NumberCardItem",
	components: { VNumberInput },
	props: {
		/** Значение */
		modelValue: Number,
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Минимальное значение */
		min: {
			type: Number,
			default: 0
		},
		/** Максимальное значение */
		max: {
			type: Number,
			default: 100
		},
		/** Шаг значения */
		step: {
			type: Number,
			default: 1
		},
		/** Нет данных */
		nodata: Boolean,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const value = computed({
			get: (): number => modelValue.value,
			set: (val: number) => emit("update:modelValue", val)
		});
		return {
			value
		};
	}
};
</script>

<style lang="scss" scoped>
.number-card-item {
	position: relative;

	&__label {
		::v-deep(.v-input__details) {
			position: absolute;
			bottom: 14px;
		}
	}
}
</style>
