<!--suppress SpellCheckingInspection -->
<template>
	<div class="Onboard">
		<div class="Onboard-cols" v-for="(col, icol) in onboardCols" :key="`col${icol}`">
			<div class="Onboard-rows" v-for="(row, irow) in col" :key="`col${icol}_row${irow}`">
				<InfoCard v-if="row === 'InfoCard'" />
				<DoorsCard v-if="row === 'DoorsCard'" />
				<EngineCard v-if="row === 'EngineCard'" />
				<FuelCard v-if="row === 'FuelCard'" />
				<MovementCard v-if="row === 'MovementCard'" />
				<ClimateCard v-if="row === 'ClimateCard'" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';
import EngineCard from '@/components/onboard/EngineCard.vue';
import FuelCard from '@/components/onboard/FuelCard.vue';
import MovementCard from '@/components/onboard/MovementCard.vue';
import ClimateCard from '@/components/onboard/ClimateCard.vue';
import { ref } from 'vue';

export default {
	name: 'Onboard',
	components: { InfoCard, DoorsCard, EngineCard, FuelCard, MovementCard, ClimateCard },
	setup() {
		const $q = useQuasar();

		let numberCols: number = Math.round($q.screen.width / 400);
		let cols: string[][] = [];
		for (let i = 0; i < numberCols; i++) cols.push([]);
		let cards = ['InfoCard', 'DoorsCard', 'EngineCard', 'FuelCard', 'MovementCard', 'ClimateCard'];

		let index: number = 0;
		cards.forEach((x) => {
			cols[index].push(x);
			index++;
			if (index >= numberCols) index = 0;
		});
		console.log(cols);

		const onboardCols = ref(cols);

		return {
			onboardCols
		};
	}
};
</script>

<style lang="sass">
.Onboard
	display: flex
	flex-direction: row
	padding: 10px 0 0 10px

	&-cols
		margin-right: 10px
</style>
