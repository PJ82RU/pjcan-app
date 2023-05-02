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
			if(this.max && Number(this.value) > Number(this.max)) { this.value = this.max; }
			else if (this.min && Number(this.value) < Number(this.min)) { this.value = ''; }
		"
		:disabled="disabled"
		:readonly="readonly"
		persistent-hint
		dense
		@blur="onBlur"
		@change="$emit('change', $event)"
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
			type: Number
		},
		/** Максимальное значение */
		max: {
			type: Number
		},
		/** Значение по умолчанию */
		defaultValue: {
			type: Number,
			default: 3
		},
		/** Только чтение */
		readonly: Boolean,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "change"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, min, max, defaultValue } = toRefs(props);

		const value = computed({
			get: (): string => modelValue.value?.toString() ?? "",
			set: (val: string | number): void => emit("update:modelValue", Number(val))
		});

		/** Доп. проверка вводимых цифр */
		watch(value, (val: string) =>
		{
			if (min.value && Number(val) < min.value) value.value = "";
			else if (max.value && Number(val) > max.value) value.value = max.value;
		});

		/** Потеря фокуса */
		const onBlur = () =>
		{
			if (min.value && Number(value.value) < min.value) value.value = defaultValue.value;
		};

		return {
			value,
			onBlur
		};
	}
};
</script>
