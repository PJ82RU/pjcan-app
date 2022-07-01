<template>
	<div class="Onboard">
		<InfoCard />
		<DoorsCard />
		<EngineCard />
		<FuelCard />
		<MovementCard />
	</div>
</template>

<script lang="ts">
import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';
import EngineCard from '@/components/onboard/EngineCard.vue';
import FuelCard from '@/components/onboard/FuelCard.vue';
import MovementCard from '@/components/onboard/MovementCard.vue';

export default {
	name: 'Onboard',
	components: { InfoCard, DoorsCard, EngineCard, FuelCard, MovementCard }
};
</script>

<style lang="sass">
.Onboard
	padding: 8px
</style>
