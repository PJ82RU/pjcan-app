<template>
	<q-card-section horizontal class="SelectCardSection">
		<div class="SelectCardSection-header">
			<div class="SelectCardSection-header-title">{{ title }}</div>
			<div class="SelectCardSection-header-comment">{{ comment }}</div>
		</div>
		<q-select
			class="SelectCardSection-input"
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
	name: 'SelectCardSection',
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

.SelectCardSection
	@include card-section()
</style>
