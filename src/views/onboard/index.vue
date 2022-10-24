<template>
	<flicking class="onboard" :options="{ bound: true }">
			<info-card v-for="i in 6" :key="i" :class="classFlicking" />
	</flicking>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import store from "@/store";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import Card from "@/components/cards/Card.vue";
import InfoCard from "./components/InfoCard.vue";

export default {
	name: "onboard",
	components: { Flicking, Card, InfoCard },
	setup()
	{
		const { name } = useDisplay();

		const onboardCardList = computed(() => store.getters["app/onboardCardList"]);
		const classFlicking = ref("");
		const updateClassFlicking = () =>
		{
			classFlicking.value = "onboard__flicking flicking-" + name.value;
		};

		onMounted(() =>
		{
			window.addEventListener("resize", updateClassFlicking);
			updateClassFlicking();
		});
		onUnmounted(() =>
		{
			window.removeEventListener("resize", updateClassFlicking);
		});

		return {
			onboardCardList,
			classFlicking
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard {
	&__flicking {
		width: 100%;
		height: calc(100% - 16px);
		margin: 8px;
	}
	//.flicking {
	//	&-xl {
	//		width: calc(100% / 4 - 8px);
	//	}
	//	&-lg,
	//	&-md {
	//		width: calc(100% / 3 - 8px);
	//	}
	//	&-sm {
	//		width: calc(100% / 2 - 8px);
	//	}
	//	&-xs {
	//		width: 100%;
	//	}
	//}

	::v-deep(.v-sheet) {
		background: rgba(255, 255, 255, 0.5);
	}
}
</style>
