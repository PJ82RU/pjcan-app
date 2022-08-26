<template>
	<q-card-section horizontal class="card-section-toggle">
		<div class="card-section-toggle__header">
			<div class="card-section-toggle__header__title">{{ title }}</div>
			<div class="card-section-toggle__header__comment">{{ comment }}</div>
		</div>
		<q-toggle class="card-section-toggle__input" dense v-model="valueToggle" :color="color" :disable="disable" />
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

.card-section-toggle
	@include card-section()

	&__input
		input
			text-align: right
</style>
