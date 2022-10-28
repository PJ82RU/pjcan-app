<template>
	<div class="input-card-item d-flex">
		<v-text-field
			class="fixed-message"
			:model-value="title"
			:hint="description"
			variant="underlined"
			density="compact"
			persistent-hint
			readonly
			dense
			:disabled="disabled"
		/>
		<v-text-field
			class="input-card-item__value"
			:class="{ nodata }"
			:model-value="value"
			variant="underlined"
			density="compact"
			reverse
			persistent-hint
			readonly
			dense
			:disabled="disabled"
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "InputCardItem",
	props: {
		/** Значение */
		value: String,
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Нет данных */
		nodata: Boolean,
		/** Выкл. */
		disabled: Boolean
	}
};
</script>

<style lang="scss" scoped>
.input-card-item {
	&__value {
		max-width: 80px;
		min-width: 80px;
		font-family: $font-family;

		&.nodata {
			color: $disable;
		}

		::v-deep(input) {
			color: var(--v-theme-primary);
		}
	}
}
</style>
