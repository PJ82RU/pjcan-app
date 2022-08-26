<template>
	<q-card-section horizontal class="card-section-select">
		<div class="card-section-select__header">
			<div class="card-section-select__header__title">{{ title }}</div>
			<div class="card-section-select__header__comment">{{ comment }}</div>
		</div>
		<q-select
			class="card-section-select__input"
			outlined
			dense
			v-model="valueSelect"
			:options="options"
			:disable="disable"
			:readonly="readonly"
			map-options
		/>
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'CardSectionSelect',
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
			type: [String, Number],
			default: ''
		},
		options: {
			type: Array,
			default: []
		},
		disable: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);

		const valueSelect = computed({
			get(): string | number {
				return modelValue.value;
			},
			set(value: string | number): void {
				context.emit('update:modelValue', value);
			}
		});

		return {
			valueSelect
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.card-section-select
	@include card-section()
</style>
