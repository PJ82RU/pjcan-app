<template>
	<q-card-section horizontal class="card-section2-icons">
		<div class="card-section2-icons__header">
			<div class="card-section2-icons__header__title">{{ title }}</div>
			<div class="card-section2-icons__header__comment">{{ comment }}</div>
		</div>
		<icon-custom
			class="card-section2-icons__icon1 spin"
			:name="icon1Name"
			:colors="{
				primary: icon1Value ? iconColorOn : iconColorOff,
				secondary: icon1Value ? iconColorSecondaryOn : iconColorSecondaryOff
			}"
			:size="iconSize"
			:style="{
				'margin-right': margin ?? undefined,
				'-webkit-animation': sec ? `spin ${sec}s infinite linear` : undefined,
				'animation': sec ? `spin ${sec}s infinite linear` : undefined
			}"
		/>
		<icon-custom
			class="card-section2-icons__icon2"
			v-if="icon2Name?.length > 0"
			:name="icon2Name"
			:colors="{
				primary: icon2Value ? iconColorOn : iconColorOff,
				secondary: icon2Value ? iconColorSecondaryOn : iconColorSecondaryOff
			}"
			:size="iconSize"
		/>
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import IconCustom from '@/components/common/iconCustom';

export default {
	name: 'CardSection2Icons',
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
		icon1Name: {
			type: String,
			require: true
		},
		icon2Name: {
			type: String,
			default: ''
		},
		icon1Value: {
			type: Boolean,
			default: false
		},
		icon2Value: {
			type: Boolean,
			default: false
		},
		iconColorOn: {
			type: String,
			default: 'primary'
		},
		iconColorSecondaryOn: {
			type: String,
			default: 'secondary'
		},
		iconColorOff: {
			type: String,
			default: 'grey-4'
		},
		iconColorSecondaryOff: {
			type: String,
			default: 'grey-4'
		},
		iconSize: {
			type: String,
			default: '30px'
		},
		margin: String,
		speedRotation: {
			type: Number,
			default: 0
		}
	},
	setup(props: any) {
		const { speedRotation } = toRefs(props);

		const sec = computed((): number | undefined =>
			speedRotation.value > 0 && speedRotation.value < 10 ? 10 - speedRotation.value : undefined
		);

		return {
			sec
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.card-section2-icons
	@include card-section()
</style>
