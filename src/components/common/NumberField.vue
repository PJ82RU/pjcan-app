<template>
	<v-text-field
		v-model="value"
		:label="label"
		:hint="hint"
		variant="underlined"
		type="number"
		:min="min"
		:max="max"
		oninput="
			if(Number(this.value) > Number(this.max)) { this.value = this.max; }
			else if (Number(this.value) < Number(this.min)) { this.value = ''; }
		"
		persistent-hint
		dense
		@blur="onBlur"
	/>
</template>

<script lang="ts">
import { computed, toRefs, watch } from "vue";

export default {
	name: "NumberField",
	props: {
		/** Вводимое значение */
		modelValue: Number,
		/** Заголовок */
		label: String,
		/** Подсказка */
		hint: String,
		/** Минимальное значение */
		min: {
			type: Number,
			default: 1
		},
		/** Максимальное значение */
		max: {
			type: Number,
			default: 300
		},
		/** Значение по умолчанию */
		defaultValue: {
			type: Number,
			default: 3
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, min, max, defaultValue } = toRefs(props);

		const value = computed({
			get: (): string => modelValue.value?.toString() ?? "",
			set: (val: string | number): void => emit("update:modelValue", Number(val))
		});

		/** Доп. проверка вводимых цыфр */
		watch(value, (val: string) =>
		{
			if (Number(val) < min.value) value.value = "";
			else if (Number(val) > max.value) value.value = max.value;
		});

		/** Потеря фокуса */
		const onBlur = () =>
		{
			if (Number(value.value) < min.value) value.value = defaultValue.value;
		};

		return {
			value,
			onBlur
		};
	}
};
</script>
