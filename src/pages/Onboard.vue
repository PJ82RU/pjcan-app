<template>
	<div class="Onboard">
		<InfoCard />
	</div>
</template>

<script lang="ts">
import InfoCard from '@/components/onboard/InfoCard.vue';

export default {
	name: 'Onboard',
	components: { InfoCard }
};
</script>

<style lang="sass">
.Onboard
	padding: 8px
</style>
