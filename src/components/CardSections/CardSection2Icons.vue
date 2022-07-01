<template>
	<q-card-section horizontal class="CardSection2Icons">
		<div class="CardSection2Icons-header">
			<div class="CardSection2Icons-header-title">{{ title }}</div>
			<div class="CardSection2Icons-header-comment">{{ comment }}</div>
		</div>
		<IconCustom :name="icon1Name" :color="icon1Color" :color-secondary="icon1ColorSecondary" :size="iconSize" />
		<IconCustom :name="icon2Name" :color="icon2Color" :color-secondary="icon2ColorSecondary" :size="iconSize" />
	</q-card-section>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import IconCustom from '@/components/common/IconCustom';

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
			require: true
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
			default: 'grey-2'
		},
		iconSize: {
			type: String,
			default: '32px'
		}
	},
	setup(props: any) {
		const { icon1Value, icon2Value, iconColorOn, iconColorOff, iconColorSecondaryOn, iconColorSecondaryOff } =
			toRefs(props);

		const icon1Color = computed((): string => (icon1Value.value ? iconColorOn.value : iconColorOff.value));
		const icon2Color = computed((): string => (icon2Value.value ? iconColorOn.value : iconColorOff.value));
		const icon1ColorSecondary = computed((): string =>
			icon1Value.value ? iconColorSecondaryOn.value : iconColorSecondaryOff.value
		);
		const icon2ColorSecondary = computed((): string =>
			icon2Value.value ? iconColorSecondaryOn.value : iconColorSecondaryOff.value
		);

		return {
			icon1Color,
			icon2Color,
			icon1ColorSecondary,
			icon2ColorSecondary
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.CardSection2Icons
	@include card-section()
</style>
