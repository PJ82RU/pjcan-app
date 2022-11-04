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
			:disabled="disabled"
		/>
		<icon-custom
			v-for="(item, index) in iconList"
			:key="`icon-card-item_${index}`"
			class="icon-card-item__icon"
			:style="{ right: `${parseInt(size) * index + (margin ? margin * index : 0)}px` }"
			:name="item.name"
			:colors="item.colors"
			:size="size"
			@click="modelSwitch[index] = !modelSwitch[index]"
		/>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "IconCardItem",
	components: { IconCustom },
	props: {
		/** Список значений иконок */
		modelValue: Array as () => boolean[],
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Список имен иконок */
		iconName: Array as () => string[],
		/** Цвета вкл. иконки */
		colorsTrue: {
			type: Object,
			default: () => ({ primary: "success", secondary: "#e2e2e2" })
		},
		/** Цвета выкл. иконки */
		colorsFalse: {
			type: Object,
			default: () => ({ primary: "disable", secondary: "disable" })
		},
		/** Размер иконок */
		size: {
			type: String,
			default: "44px"
		},
		/** Отступ */
		margin: Number,
		/** Нет данных */
		nodata: Boolean,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, iconName, colorsTrue, colorsFalse, nodata, disabled } = toRefs(props);
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
					colors: x && !nodata.value && !disabled.value ? colorsTrue.value : colorsFalse.value
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
		top: 18px;
		right: 0;
	}
}
</style>
