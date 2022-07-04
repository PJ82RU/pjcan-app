<template>
	<q-card-section class="CardSectionSlider">
		<div class="CardSectionSlider-header">
			<div class="CardSectionSlider-header-title">{{ title }}</div>
			<div class="CardSectionSlider-header-comment">{{ comment }}</div>
		</div>
		<q-item class="CardSectionSlider-value">
			<q-item-section side>
				<IconCustom class="CardSectionSlider-icon-left" :name="iconLeftName" />
			</q-item-section>
			<q-item-section>
				<q-slider v-model="valueInput" :min="min" :max="max" label />
			</q-item-section>
			<q-item-section side>
				<IconCustom class="CardSectionSlider-icon-right" :name="iconRightName" />
			</q-item-section>
		</q-item>
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import IconCustom from '@/components/common/iconCustom';

export default {
	name: 'CardSectionSlider',
	components: { IconCustom },
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
			type: Number,
			default: 0
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 10
		},
		iconLeftName: {
			type: String,
			default: 'volume_down'
		},
		iconRightName: {
			type: String,
			default: 'volume_up'
		}
	},
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);

		const valueInput = computed({
			get: (): number => modelValue.value,
			set: (value: number): void => context.emit('update:modelValue', value)
		});

		return {
			valueInput
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.CardSectionSlider
	@include card-section(100%, 80px)

	&-value
		padding-left: 0
		padding-right: 0
</style>
