<template>
	<flicking ref="flicking" class="setting" :options="{ bound: true, align: 'prev' }">
		<div v-for="name in cards" :key="name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${name}-card`" :car-model="carModel" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import LcdCard from "./components/LcdCard.vue";
import TeyesCard from "./components/TeyesCard.vue";
import OnboardCard from "./components/OnboardCard.vue";
import canbus from "@/api/canbus";
import { API_CAR_CONFIG_EVENT, ECarModel, ICarConfig } from "@/models/pjcan/car";

export default {
	name: "setting",
	components: { Flicking, LcdCard, TeyesCard, OnboardCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const carModel = ref(canbus.configs.car.carModel);
		const cards = computed(() =>
			carModel.value !== ECarModel.CAR_MODEL_MAZDA_CX9_REST ? ["lcd", "teyes", "onboard"] : ["teyes", "onboard"]
		);

		const onReceiveCarConfig = (res: ICarConfig): void =>
		{
			if (res.isData) carModel.value = res.carModel;
		};

		onMounted(() =>
		{
			canbus.addListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			onReceiveCarConfig(canbus.configs.car);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
		});

		return {
			flicking,
			carModel,
			cards,
			display
		};
	}
};
</script>

<style lang="scss" scoped>
.setting {
	height: 100%;
}
</style>
