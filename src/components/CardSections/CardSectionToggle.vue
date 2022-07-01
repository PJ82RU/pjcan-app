<template>
	<q-card-section horizontal class="CardSectionToggle">
		<div class="CardSectionToggle-header">
			<div class="CardSectionToggle-header-title">{{ title }}</div>
			<div class="CardSectionToggle-header-comment">{{ comment }}</div>
		</div>
		<q-toggle class="CardSectionToggle-input" dense v-model="valueToggle" :color="color" :disable="disable" />
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'CardSectionToggle',
	props: {
		title: {
			type: String,
			require: true
		},
		comment: {
			type: String,
			default: ''
		},
		modelValue: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: 'primary'
		},
		disable: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);

		const valueToggle = computed({
			get(): string {
				return modelValue.value;
			},
			set(val: string): void {
				context.emit('update:modelValue', val);
			}
		});

		return {
			valueToggle
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.CardSectionToggle
	@include card-section()

	&-input
		input
			text-align: right
</style>
