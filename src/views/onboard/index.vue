<template>
	<flicking ref="flicking" class="onboard" :options="{ bound: true, align: 'prev' }">
		<div v-for="name in onboardCardList" :key="name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${name}-card`" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, provide, ref } from "vue";
import store from "@/store";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import InfoCard from "./components/InfoCard.vue";
import EngineCard from "./components/EngineCard.vue";
import FuelCard from "./components/FuelCard.vue";
import MovementCard from "./components/MovementCard.vue";
import DoorsCard from "./components/DoorsCard.vue";
import VolumeCard from "./components/VolumeCard.vue";
import ClimateCard from "./components/ClimateCard.vue";

export default {
	name: "onboard",
	components: { Flicking, InfoCard, EngineCard, FuelCard, MovementCard, DoorsCard, VolumeCard, ClimateCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const onboardCardList = computed(() => store.getters["app/onboardCardList"]);

		return {
			flicking,
			onboardCardList,
			display
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard {
	height: 100%;
}
</style>
