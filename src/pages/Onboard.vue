<!--suppress SpellCheckingInspection -->
<template>
	<div class="Onboard">
		<div :class="{ 'Onboard-rows': true, 'Onboard-last': classLast(irow) }" v-for="(row, irow) in cards" :key="row">
			<ManualControlCard v-if="row === 'ManualControlCard'" />
			<InfoCard v-if="row === 'InfoCard'" />
			<DoorsCard v-if="row === 'DoorsCard'" />
			<EngineCard v-if="row === 'EngineCard'" />
			<FuelCard v-if="row === 'FuelCard'" />
			<MovementCard v-if="row === 'MovementCard'" />
			<ClimateCard v-if="row === 'ClimateCard'" />
			<VolumeCard v-if="row === 'VolumeCard'" />
			<BoseCard v-if="row === 'BoseCard'" />
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
import ManualControlCard from '@/components/onboard/ManualControlCard.vue';

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
		ManualControlCard
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
.Onboard
	padding: 10px

	&-last .CardSection
		margin-bottom: 0
</style>
