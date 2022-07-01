<template>
	<div class="Onboard">
		<InfoCard />
		<DoorsCard />
		<EngineCard />
	</div>
</template>

<script lang="ts">
import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';
import EngineCard from '@/components/onboard/EngineCard.vue';

export default {
	name: 'Onboard',
	components: { InfoCard, DoorsCard, EngineCard }
};
</script>

<style lang="sass">
.Onboard
	padding: 8px
</style>
