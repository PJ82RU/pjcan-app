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
			v-for="(item, index) in iconList"
			:key="`icon-card-item_${index}`"
			class="icon-card-item__icon"
			:style="{ right: `${parseInt(size) * index}px` }"
			:name="item.name"
			:colors="item.colors"
			:size="size"
			@click="modelSwitch[index] = !modelSwitch[index]"
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
		modelValue: Array as () => boolean[],
		title: String,
		description: String,
		iconName: Array as () => string[],
		colorsTrue: {
			type: Object,
			default: () => ({ primary: "#66bb6a", secondary: "#e2e2e2" })
		},
		colorsFalse: {
			type: Object,
			default: () => ({ primary: "#676b6d", secondary: "#676b6d" })
		},
		size: {
			type: String,
			default: "44px"
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, iconName, colorsTrue, colorsFalse } = toRefs(props);
		const modelSwitch = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});

		/** Список параметров иконок */
		const iconList = computed((): any[] =>
		{
			const result: any[] = [];
			modelSwitch.value?.forEach((x: boolean, i: number) =>
			{
				result.push({
					name: iconName.value[i],
					colors: x ? colorsTrue.value : colorsFalse.value
				});
			});
			return result;
		});

		return {
			modelSwitch,
			iconList
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
