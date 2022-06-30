<template>
	<q-card-section horizontal class="ToggleCardSection">
		<div class="ToggleCardSection-header">
			<div class="ToggleCardSection-header-title">{{ title }}</div>
			<div class="ToggleCardSection-header-comment">{{ comment }}</div>
		</div>
		<q-toggle class="ToggleCardSection-input" dense v-model="valueToggle" :color="color" :disable="disable" />
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'ToggleCardSection',
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
			default: true
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

.ToggleCardSection
	@include card-section()

	&-input
		input
			text-align: right
</style>
