<template>
	<div class="Onboard">
		<InfoCard />
		<DoorsCard />
	</div>
</template>

<script lang="ts">
import InfoCard from '@/components/onboard/InfoCard.vue';
import DoorsCard from '@/components/onboard/DoorsCard.vue';

export default {
	name: 'Onboard',
	components: { InfoCard, DoorsCard }
};
</script>

<style lang="sass">
.Onboard
	padding: 8px
</style>
