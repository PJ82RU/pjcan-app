<template>
	<flicking ref="flicking" class="onboard" :options="{ bound: true, align: 'prev' }">
		<div v-for="item in onboardCardList" :key="item.name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${item.name}-card`" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";
import store from "@/store";

import Flicking from "@egjs/vue3-flicking";
import InfoCard from "./components/InfoCard.vue";
import EngineCard from "./components/EngineCard.vue";
import FuelCard from "./components/FuelCard.vue";
import MovementCard from "./components/MovementCard.vue";
import DoorsCard from "./components/DoorsCard.vue";
import VolumeCard from "./components/VolumeCard.vue";
import ClimateCard from "./components/ClimateCard.vue";

import canbus from "@/api/canbus";
import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { API_CAR_CONFIG_EVENT, ICarConfig } from "@/models/pjcan/car";

export default {
	name: "onboard",
	components: { Flicking, InfoCard, EngineCard, FuelCard, MovementCard, DoorsCard, VolumeCard, ClimateCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const onboardCardList = ref([] as IOnboardCard[]);
		const onReceiveCarConfig = (res: ICarConfig): void =>
		{
			if (res.isData)
			{
				onboardCardList.value = store.getters["app/onboardCardList"]?.filter(
					(x: IOnboardCard) => x.car?.indexOf(res.carModel) >= 0
				);
			}
		};

		onMounted(() =>
		{
			canbus.startFetchValue();
			canbus.addListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			onReceiveCarConfig(canbus.configs.car);
		});
		onUnmounted(() =>
		{
			canbus.stopFetchValue();
			canbus.removeListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
		});

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
