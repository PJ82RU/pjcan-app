<template>
	<div class="icon-card-item">
		<v-text-field
			:model-value="title"
			:hint="description"
			variant="underlined"
			density="compact"
			persistent-hint
			readonly
			dense
		/>
		<icon-custom
			class="icon-card-item__icon"
			:name="iconName"
			:colors="colors"
			:size="size"
			@click="modelSwitch = !modelSwitch"
		/>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

import IconCustom from "@/components/icon-custom/IconCustom.vue";

export default {
	name: "IconCardItem",
	components: { IconCustom },
	props: {
		modelValue: Boolean,
		title: String,
		description: String,
		iconName: String,
		colorsTrue: {
			type: Object,
			default: () => ({ primary: "#0b677b", secondary: "#25323e" })
		},
		colorsFalse: {
			type: Object,
			default: () => ({ primary: "#ccc", secondary: "#aaa" })
		},
		size: {
			type: String,
			default: "44px"
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, colorsTrue, colorsFalse } = toRefs(props);
		const modelSwitch = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});
		const colors = computed(() => (modelSwitch.value ? colorsTrue.value : colorsFalse.value));

		return {
			modelSwitch,
			colors
		};
	}
};
</script>

<style lang="scss" scoped>
.icon-card-item {
	position: relative;

	&__icon {
		position: absolute;
		top: 12px;
		right: 0;
	}
}
</style>
