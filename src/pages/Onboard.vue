<!--suppress SpellCheckingInspection -->
<template>
	<div class="onboard">
		<div
			:class="{ 'onboard__rows': true, 'onboard__last': classLast(irow) }"
			v-for="(row, irow) in cards"
			:key="row"
		>
			<manual-control-card v-if="row === 'ManualControlCard'" />
			<info-card v-if="row === 'InfoCard'" />
			<doors-card v-if="row === 'DoorsCard'" />
			<engine-card v-if="row === 'EngineCard'" />
			<fuel-card v-if="row === 'FuelCard'" />
			<movement-card v-if="row === 'MovementCard'" />
			<climate-card v-if="row === 'ClimateCard'" />
			<volume-card v-if="row === 'VolumeCard'" />
			<bose-card v-if="row === 'BoseCard'" />
			<buttons-setting v-if="row === 'ButtonsSetting'" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';
import { Onboard } from '@/store/onboard';

import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';
import EngineCard from '@/components/onboard/EngineCard.vue';
import FuelCard from '@/components/onboard/FuelCard.vue';
import MovementCard from '@/components/onboard/MovementCard.vue';
import ClimateCard from '@/components/onboard/ClimateCard.vue';
import VolumeCard from '@/components/onboard/VolumeCard.vue';
import BoseCard from '@/components/onboard/BoseCard.vue';
import ManualControlCard from '@/components/onboard/ManualControlCard/ManualControlCard.vue';

import ButtonsSetting from '@/components/settings/ButtonsSetting.vue';

export default {
	name: 'Onboard',
	components: {
		InfoCard,
		DoorsCard,
		EngineCard,
		FuelCard,
		MovementCard,
		ClimateCard,
		VolumeCard,
		BoseCard,
		ManualControlCard,
		ButtonsSetting
	},
	setup() {
		const onboard = inject('onboard') as Ref<Onboard>;
		const cards = computed((): string[] => onboard.value.cards);
		const classLast = (index: number): boolean => index + 1 === onboard.value.cards.length;

		return {
			cards,
			classLast
		};
	}
};
</script>

<style lang="sass">
.onboard
	padding: 10px

	&__last .card-section
		margin-bottom: 0
</style>
