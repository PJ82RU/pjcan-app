<template>
	<div class="slider-card-item">
		<div class="text-h4" :class="{ 'slider-card-item__disabled': disabled }">
			{{ title }}
		</div>
		<v-slider
			v-model="modelSlider"
			:min="min"
			:max="max"
			:prepend-icon="!prependIcon ? prependIconMdi : undefined"
			:append-icon="!appendIcon ? appendIconMdi : undefined"
			:color="color()"
			:step="1"
			:disabled="disabled"
			hide-details
			@update:focused="onFocusedUpdate"
		>
			<template #prepend v-if="prependIcon">
				<icon-custom :name="prependIcon" :size="sizeIcon" :color="colorIcon" />
			</template>
			<template #append v-if="appendIcon">
				<icon-custom :name="appendIcon" :size="sizeIcon" :color="colorIcon" />
			</template>
		</v-slider>
		<div class="mt-1 slider-card-item__description" :class="{ 'slider-card-item__disabled': disabled }">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed, inject, toRefs } from "vue";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "SliderCardItem",
	components: { IconCustom },
	props: {
		/** Значение slider */
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
			default: 32
		},
		/** Имя MDI иконки в начале */
		prependIconMdi: {
			type: String,
			default: "mdi-volume-minus"
		},
		/** Имя MDI иконки в конце */
		appendIconMdi: {
			type: String,
			default: "mdi-volume-plus"
		},
		/** Имя иконки в начале */
		prependIcon: String,
		/** Имя иконки в конце */
		appendIcon: String,
		/** Размер иконки */
		sizeIcon: {
			type: [String, Number],
			default: 24
		},
		/** Цвет иконки */
		colorIcon: {
			type: String,
			default: "#939597"
		},
		/** Точки */
		points: {
			type: Array as () => number[],
			default: () => [7, 18, 26, 32]
		},
		/** Цвет точки */
		pointColors: {
			type: Array as () => string[],
			default: () => ["primary", "success", "warning", "error"]
		},
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, points, pointColors } = toRefs(props);
		const flicking = inject("flicking") as any;

		const modelSlider = computed({
			get: (): number => modelValue.value,
			set: (val: number) => emit("update:modelValue", val)
		});

		/**
		 * Блокировка flicking
		 * @param {boolean} ev Статус фокуса
		 */
		const onFocusedUpdate = (ev: boolean): void =>
		{
			if (ev) flicking.value.disableInput();
			else flicking.value.enableInput();
		};

		/** Цвет */
		const color = (): string =>
		{
			const index = points.value?.findIndex((x: number): boolean => modelSlider.value <= x);
			return pointColors.value?.[index] ?? "error";
		};

		return {
			flicking,
			modelSlider,
			onFocusedUpdate,
			color
		};
	}
};
</script>

<style lang="scss" scoped>
.slider-card-item {
	&__description {
		font-size: 0.875rem;
		line-height: 0.875rem;
		font-weight: 300;
		opacity: var(--v-medium-emphasis-opacity);
	}
	&__disabled {
		opacity: 0.35;
	}
}
</style>
