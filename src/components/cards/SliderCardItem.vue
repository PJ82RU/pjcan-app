<template>
	<div class="slider-card-item">
		<div class="text-h4">
			{{ title }}
		</div>
		<v-slider
			v-model="modelSlider"
			:min="min"
			:max="max"
			:prepend-icon="prependIconMdi"
			:append-icon="appendIconMdi"
			:color="color()"
			:step="1"
			hide-details
			@update:focused="onFocusedUpdate"
		/>
		<div class="mt-1 slider-card-item__description">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed, inject, toRefs } from "vue";

export default {
	name: "SliderCardItem",
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
		/** Точки */
		points: {
			type: Array as () => number[],
			default: () => [7, 18, 26, 32]
		},
		/** Цвет точки */
		pointColors: {
			type: Array as () => string[],
			default: () => ["primary", "success", "warning", "error"]
		}
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
		font-weight: 300;
		font-size: 0.75rem;
		line-height: 0.75rem;
		opacity: var(--v-medium-emphasis-opacity);
	}
}
</style>
