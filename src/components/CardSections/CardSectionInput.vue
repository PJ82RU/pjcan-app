<template>
	<q-card-section horizontal class="CardSectionInput">
		<div class="CardSectionInput-header">
			<div class="CardSectionInput-header-title">{{ title }}</div>
			<div class="CardSectionInput-header-comment">{{ comment }}</div>
		</div>
		<q-input
			class="CardSectionInput-input"
			outlined
			dense
			v-model="valueInput"
			:disable="disable"
			:readonly="readonly"
			:type="type"
			:placeholder="placeholder"
		/>
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'CardSectionInput',
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
			default: false
		},
		placeholder: {
			type: String,
			default: '---'
		},
		disable: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'text'
		},
		min: {
			type: [Number, undefined],
			default: undefined
		},
		max: {
			type: [Number, undefined],
			default: undefined
		}
	},
	setup(props: any, context: any) {
		const { modelValue, type, min, max } = toRefs(props);

		const valueInput = computed({
			get(): string | number {
				return modelValue.value;
			},
			set(value: string | number): void {
				if (type.value === 'number') {
					if (typeof value !== 'number') value = Number(value);
					if (min.value !== undefined && value < min.value) value = min.value;
					else if (max.value !== undefined && value > max.value) value = max.value;
				}

				context.emit('update:modelValue', value);
			}
		});

		return {
			valueInput
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.CardSectionInput
	@include card-section(100%, 80px)

	&-input
		input
			text-align: right
</style>
