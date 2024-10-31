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
			ref="IconCustom"
			v-for="(item, index) in iconList"
			:key="`icon-card-item_${index}`"
			class="icon-card-item__icon"
			:style="{
				right: `${parseInt(size) * index + (margin ? margin * index : 0)}px`,
				animation:
					rotation != undefined && rotation > 0 ? 'rotating ' + rotation + 's linear infinite' : undefined
			}"
			:name="item.name"
			:colors="item.colors"
			:size="size"
			@click="onChange(index)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, ComputedRef, toRefs } from "vue";

import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "IconCardItem",
	components: { IconCustom },
	props: {
		/** Список значений иконок */
		modelValue: {
			type: Array as () => boolean[],
			required: true
		},
		/** Заголовок */
		title: {
			type: String,
			required: true
		},
		/** Описание */
		description: {
			type: String,
			default: undefined
		},
		/** Список имен иконок */
		iconName: {
			type: Array as () => string[],
			default: undefined
		},
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
		/** Скорость вращения иконки */
		rotation: {
			type: Number,
			default: undefined
		},
		/** Отступ */
		margin: {
			type: Number,
			default: undefined
		},
		/** Нет данных */
		nodata: {
			type: Boolean,
			default: false
		},
		/** Выкл. */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue", "change"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, iconName, colorsTrue, colorsFalse, nodata, disabled } = toRefs(props);

		/**
		 * Изменение состояния
		 * @param {number} index
		 */
		const onChange: (index: number) => void = (index: number): void =>
		{
			if (!disabled.value)
			{
				modelValue.value[index] = !modelValue.value[index];
				emit("update:modelValue", modelValue.value);
				emit("change", modelValue.value);
			}
		};

		/** Список параметров иконок */
		const iconList: ComputedRef<any[]> = computed((): any[] =>
		{
			const result: any[] = [];
			modelValue.value?.forEach((x: boolean, i: number) =>
			{
				result.push({
					name: iconName.value[i],
					colors: x && !nodata.value && !disabled.value ? colorsTrue.value : colorsFalse.value
				});
			});
			return result;
		});

		return {
			iconList,
			onChange
		};
	}
};
</script>

<style lang="scss" scoped>
.icon-card-item {
	position: relative;

	&__icon {
		position: absolute;
		top: 14px;
		right: 0;
	}
}
</style>
