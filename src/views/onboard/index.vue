<template>
	<flicking class="onboard" :options="{ bound: true, align: 'prev' }">
		<div key="info-card" class="onboard__flicking" :class="nameDisplay">
			<info-card />
		</div>
		<div key="engine-card" class="onboard__flicking" :class="nameDisplay">
			<engine-card />
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed } from "vue";
import store from "@/store";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import InfoCard from "./components/InfoCard.vue";
import EngineCard from "./components/EngineCard.vue";

export default {
	name: "onboard",
	components: { Flicking, InfoCard, EngineCard },
	setup()
	{
		const { name } = useDisplay();

		const onboardCardList = computed(() => store.getters["app/onboardCardList"]);
		const nameDisplay = computed(() => ({
			"flicking-xl": name.value === "xl",
			"flicking-lg": name.value === "lg",
			"flicking-md": name.value === "md",
			"flicking-sm": name.value === "sm",
			"flicking-xs": name.value === "xs"
		}));

		return {
			onboardCardList,
			nameDisplay
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard {
	height: 100%;

	&__flicking {
		width: calc(100% / 3 - 16px + 16px / 3);
		height: 100%;
		margin-right: 16px;
	}
	.flicking {
		&-xl {
			width: calc(100% / 4 - 16px + 16px / 4);
		}
		&-lg,
		&-md {
			width: calc(100% / 3 - 16px + 16px / 3);
		}
		&-sm {
			width: calc(100% / 2 - 16px + 16px / 2);
		}
		&-xs {
			width: calc(100%);
		}
	}
}
</style>
