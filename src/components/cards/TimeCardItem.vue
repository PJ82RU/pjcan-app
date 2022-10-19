<template>
	<div class="time-card-item d-flex">
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
			class="time-card-item__time"
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
	name: "TimeCardItem",
	props: {
		value: String,
		title: String,
		description: String
	}
};
</script>

<style lang="scss" scoped>
.time-card-item {
	&__time {
		width: 70px;
		font-family: "Jura", "Roboto", sans-serif;

		::v-deep(input) {
			color: $primary-color;
		}
	}
}
</style>
