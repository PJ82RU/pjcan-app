<!--suppress SpellCheckingInspection -->
<template>
	<div class="Onboard">
		<div :class="{ 'Onboard-rows': true, 'Onboard-last': classLast(irow) }" v-for="(row, irow) in cards" :key="row">
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
import { computed, provide, ref } from 'vue';
import { Onboard } from '@/store/onboard';

import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';
import EngineCard from '@/components/onboard/EngineCard.vue';
import FuelCard from '@/components/onboard/FuelCard.vue';
import MovementCard from '@/components/onboard/MovementCard.vue';
import ClimateCard from '@/components/onboard/ClimateCard.vue';
import VolumeCard from '@/components/onboard/VolumeCard.vue';
import BoseCard from '@/components/onboard/BoseCard.vue';

export default {
	name: 'Onboard',
	components: { InfoCard, DoorsCard, EngineCard, FuelCard, MovementCard, ClimateCard, VolumeCard, BoseCard },
	setup() {
		const onboard = ref(new Onboard());
		provide('onboard', onboard);

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
