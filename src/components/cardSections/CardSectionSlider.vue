<template>
	<q-card-section class="card-section-slider">
		<div class="card-section-slider__header">
			<div class="card-section-slider__header__title">{{ title }}</div>
			<div class="card-section-slider__header__comment">{{ comment }}</div>
		</div>
		<q-item class="card-section-slider__value">
			<q-item-section side>
				<icon-custom class="card-section-slider__icon__left" :name="iconLeftName" />
			</q-item-section>
			<q-item-section>
				<q-slider v-model="valueInput" :min="min" :max="max" label />
			</q-item-section>
			<q-item-section side>
				<icon-custom class="card-section-slider__icon__right" :name="iconRightName" />
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

.card-section-slider
	@include card-section(100%, 80px)

	&__value
		padding-left: 0
		padding-right: 0
</style>
