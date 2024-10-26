<template>
	<flicking ref="flicking" class="setting" :options="{ bound: true, align: 'prev' }">
		<div v-for="name in cards" :key="name" class="mr-4" :class="`flicking-${display}`">
			<component :is="`${name}-card`" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, provide, ref } from "vue";
import { useDisplay } from "vuetify";
import store from "@/store";
import Flicking from "@egjs/vue3-flicking";

import LcdCard from "./components/LcdCard.vue";
import HeadCard from "./components/HeadCard.vue";
import DatetimeCard from "./components/DateTimeCard.vue";
import OnboardCard from "./components/OnboardCard.vue";

import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "setting",
	components: { Flicking, LcdCard, HeadCard, DatetimeCard, OnboardCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const cards = computed(() =>
			store.getters["config/carModel"] !== TCarModel.CAR_MODEL_MAZDA_CX9_REST
				? ["lcd", "head", "datetime", "onboard"]
				: ["head", "datetime", "onboard"]
		);

		return {
			flicking,
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
