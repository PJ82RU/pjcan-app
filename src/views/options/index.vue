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
import TeyesCard from "./components/TeyesCard.vue";
import OnboardCard from "./components/OnboardCard.vue";

import { TCarModel } from "@/models/pjcan/mazda";

export default {
	name: "setting",
	components: { Flicking, LcdCard, TeyesCard, OnboardCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const cards = computed(() =>
			store.getters["app/carModel"] !== TCarModel.CAR_MODEL_MAZDA_CX9_REST
				? ["lcd", "teyes", "onboard"]
				: ["teyes", "onboard"]
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
