<template>
	<div class="progress-card-item">
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
		<v-progress-circular
			class="progress-card-item__progress"
			:color="color"
			:model-value="value"
			:size="size"
			:width="6"
			:disabled="nodata || disabled"
		>
			{{ !nodata && !disabled && value ? value.toFixed() : "" }}
		</v-progress-circular>
	</div>
</template>

<script lang="ts">
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "ProgressCardItem",
	components: { IconCustom },
	props: {
		/** Значение */
		value: Number,
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Цвет прогресса */
		color: {
			type: String,
			default: "success"
		},
		/** Размер иконок */
		size: {
			type: Number,
			default: 44
		},
		/** Нет данных */
		nodata: Boolean,
		/** Выкл. */
		disabled: Boolean
	}
};
</script>

<style lang="scss" scoped>
.progress-card-item {
	position: relative;

	&__progress {
		position: absolute;
		top: 10px;
		right: 0;

		::v-deep(.v-progress-circular__content) {
			font-size: 0.75rem;
			line-height: 1rem;
		}
	}
}
</style>
