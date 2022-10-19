<template>
	<div class="switch-card-item">
		<v-text-field
			:model-value="title"
			:hint="description"
			:loading="loading"
			variant="underlined"
			density="compact"
			persistent-hint
			readonly
			dense
		/>
		<v-switch
			v-model="modelSwitch"
			class="switch-card-item__switch"
			density="compact"
			color="primary"
			hide-details
		/>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

export default {
	name: "SwitchCardItem",
	props: {
		modelValue: Boolean,
		title: String,
		description: String,
		loading: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const modelSwitch = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});

		return {
			modelSwitch
		};
	}
};
</script>

<style lang="scss" scoped>
.switch-card-item {
	position: relative;

	&__switch {
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>
