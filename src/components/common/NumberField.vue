<template>
	<v-text-field
		v-model="value"
		:label="label"
		:hint="hint"
		variant="underlined"
		type="number"
		:min="min"
		:max="max"
		oninput="if(Number(this.value) > Number(this.max)) { this.value = this.max; } else if (Number(this.value) < Number(this.min)) { this.value = this.min; }"
		persistent-hint
		dense
	/>
</template>

<script lang="ts">
import { computed, toRefs, watch } from "vue";

export default {
	name: "NumberField",
	props: {
		modelValue: {
			type: Number,
			required: true
		},
		label: String,
		hint: String,
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 300
		}
	},
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, min, max } = toRefs(props);

		const value = computed({
			get: (): string => modelValue.value.toString(),
			set: (val: string | number): void => emit("update:modelValue", Number(val))
		});
		watch(value, (val: string) =>
		{
			if (val.length === 0 || Number(val) < min.value) value.value = min.value;
			else if (Number(val) > max.value) value.value = max.value;
		});

		return {
			value
		};
	}
};
</script>
