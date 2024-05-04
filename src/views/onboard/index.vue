<template>
	<flicking ref="flicking" class="onboard" :options="{ bound: true, align: 'prev' }">
		<div v-for="item in cards" :key="item.name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${item.name}-card`" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import store from "@/store";
import canbus from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import InfoCard from "./components/InfoCard.vue";
import EngineCard from "./components/EngineCard.vue";
import FuelCard from "./components/FuelCard.vue";
import MovementCard from "./components/MovementCard.vue";
import DoorsCard from "./components/DoorsCard.vue";
import ClimateCard from "./components/ClimateCard.vue";
import BoseCard from "./components/BoseCard.vue";

import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { API_DEVICE_VALUE_EXEC } from "@/models/pjcan/device";
import { API_SENSORS_VALUE_EXEC } from "@/models/pjcan/sensors";
import { API_TEMPERATURE_VALUE_EXEC } from "@/models/pjcan/temperature";
import { API_ENGINE_VALUE_EXEC } from "@/models/pjcan/engine";
import { API_FUEL_VALUE_EXEC } from "@/models/pjcan/fuel";
import { API_MOVEMENT_VALUE_EXEC } from "@/models/pjcan/movement";
import { API_DOORS_VALUE_EXEC } from "@/models/pjcan/doors";
import { API_CLIMATE_VALUE_EXEC } from "@/models/pjcan/climate";

export default {
	name: "onboard",
	components: {
		Flicking,
		InfoCard,
		EngineCard,
		FuelCard,
		MovementCard,
		DoorsCard,
		ClimateCard,
		BoseCard
	},
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		store.dispatch("app/readOnboardCardList");
		const cards = computed(() =>
		{
			return store.getters["app/onboardCardList"]?.filter(
				(x: IOnboardCard) => x.enabled && x.car?.indexOf(store.getters["config/carModel"]) >= 0
			);
		});
		const listExec = computed((): number[] =>
		{
			const result: number[] = [];
			cards.value?.forEach((card: IOnboardCard) =>
			{
				switch (card.name)
				{
					case "info":
						result.push(API_DEVICE_VALUE_EXEC);
						result.push(API_SENSORS_VALUE_EXEC);
						result.push(API_TEMPERATURE_VALUE_EXEC);
						break;
					case "engine":
						result.push(API_ENGINE_VALUE_EXEC);
						break;
					case "fuel":
						result.push(API_FUEL_VALUE_EXEC);
						break;
					case "movement":
						result.push(API_MOVEMENT_VALUE_EXEC);
						break;
					case "doors":
						result.push(API_DOORS_VALUE_EXEC);
						break;
					case "climate":
						result.push(API_CLIMATE_VALUE_EXEC);
						break;
				}
			});
			return result;
		});
		watch(listExec, (val: number[]) =>
		{
			canbus.loop(val);
		});
		onMounted(() =>
		{
			canbus.loop(listExec.value);
		});
		onUnmounted(() =>
		{
			canbus.loopFree();
		});

		return {
			flicking,
			cards,
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
