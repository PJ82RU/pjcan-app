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
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "InputCardItem",
	props: {
		value: String,
		title: String,
		description: String,
		nodata: Boolean
	}
};
</script>

<style lang="scss" scoped>
.input-card-item {
	&__value {
		width: 70px;
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
