<template>
	<q-card-section horizontal class="CardSectionSelect">
		<div class="CardSectionSelect-header">
			<div class="CardSectionSelect-header-title">{{ title }}</div>
			<div class="CardSectionSelect-header-comment">{{ comment }}</div>
		</div>
		<q-select
			class="CardSectionSelect-input"
			outlined
			dense
			v-model="valueSelect"
			:options="options"
			:disable="disable"
			:readonly="readonly"
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
			type: String,
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
			get(): string {
				return modelValue.value;
			},
			set(value: string): void {
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

.CardSectionSelect
	@include card-section()
</style>
