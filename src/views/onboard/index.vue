<template>
	<flicking ref="flicking" class="onboard" :options="{ bound: true, align: 'prev' }">
		<div v-for="item in cards" :key="item.name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${item.name}-card`" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
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
import { ChoiceValue } from "@/models/pjcan/choice";
import { Timeout } from "@/models/types/Timeout";
import { API_DEVICE_VALUE_EXEC } from "@/models/pjcan/device";
import { API_SENSORS_VALUE_EXEC } from "@/models/pjcan/sensors";
import { API_TEMPERATURE_VALUE_EXEC } from "@/models/pjcan/temperature";
import { API_BOSE_CONFIG_EXEC } from "@/models/pjcan/bose";
import { API_VOLUME_CONFIG_EXEC } from "@/models/pjcan/volume";
import { API_ENGINE_VALUE_EXEC } from "@/models/pjcan/engine";
import { API_FUEL_VALUE_EXEC } from "@/models/pjcan/fuel";
import { API_MOVEMENT_VALUE_EXEC } from "@/models/pjcan/movement";
import { API_DOORS_VALUE_EXEC } from "@/models/pjcan/doors";
import { API_CLIMATE_VALUE_EXEC } from "@/models/pjcan/climate";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

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

		const cards = computed(() =>
		{
			return store.getters["app/onboardCardList"]?.filter(
				(x: IOnboardCard) => x.enabled && x.car?.indexOf(store.getters["app/carModel"]) >= 0
			);
		});
		const listExec = computed(() =>
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
					case "bose":
						result.push(API_BOSE_CONFIG_EXEC);
						result.push(API_VOLUME_CONFIG_EXEC);
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

		let loop: Timeout;
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				if (!loop)
				{
					loop = setInterval(() =>
					{
						if (listExec.value?.length)
						{
							const choice = new ChoiceValue();
							choice.listID = listExec.value;
							canbus.query(choice, true);
						}
					}, 250);
				}
			}
			else
			{
				clearInterval(loop);
				loop = undefined;
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
			onBegin(false);
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
