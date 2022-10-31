<template>
	<flicking ref="flicking" class="buttons" :options="{ bound: true, align: 'prev' }">
		<div v-for="index in 5" :key="`buttons-${index}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card :type="index" />
		</div>
	</flicking>
</template>

<script lang="ts">
import { provide, ref } from "vue";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";

export default {
	name: "buttons",
	components: { Flicking, SettingsCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		return {
			flicking,
			display
		};
	}
};
</script>

<style lang="scss" scoped>
.buttons {
	height: 100%;
}
</style>
