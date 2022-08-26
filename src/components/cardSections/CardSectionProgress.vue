<template>
	<q-card-section horizontal class="card-section-progress">
		<div class="card-section-progress__header">
			<div class="card-section-progress__header__title">{{ title }}</div>
			<div class="card-section-progress__header__comment">{{ comment }}</div>
		</div>
		<q-circular-progress
			show-value
			font-size="12px"
			size="45px"
			:value="value"
			:thickness="thickness"
			:color="color"
			:track-color="trackColor"
			class="card-section-progress__progress q-ma-md"
		>
			{{ value }}{{ prefix }}
		</q-circular-progress>
	</q-card-section>
</template>

<script lang="ts">
export default {
	name: 'CardSectionProgress',
	props: {
		title: {
			type: String,
			require: true
		},
		comment: {
			type: String,
			default: ''
		},
		value: {
			type: Number,
			default: 0
		},
		prefix: {
			type: String,
			default: '%'
		},
		thickness: {
			type: Number,
			default: 0.1
		},
		color: {
			type: String,
			default: 'primary'
		},
		trackColor: {
			type: String,
			default: 'grey-4'
		}
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.card-section-progress
	@include card-section(100%, 80px)

	&__progress
		margin: 0
</style>
