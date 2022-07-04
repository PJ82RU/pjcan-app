<template>
	<q-card-section horizontal class="CardSectionProgress">
		<div class="CardSectionProgress-header">
			<div class="CardSectionProgress-header-title">{{ title }}</div>
			<div class="CardSectionProgress-header-comment">{{ comment }}</div>
		</div>
		<q-circular-progress
			show-value
			font-size="12px"
			size="45px"
			:value="value"
			:thickness="thickness"
			:color="color"
			:track-color="trackColor"
			class="CardSectionProgress-progress q-ma-md"
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

.CardSectionProgress
	@include card-section(100%, 80px)

	&-progress
		margin: 0
</style>
