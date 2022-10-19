<template>
	<v-carousel
		class="onboard"
		height="100%"
		:show-arrows="false"
		:interval="60000"
		hide-delimiter-background
		cycle
	>
		<v-carousel-item
			v-for="(item, index) in onboardCardList"
			:key="`onboard-item_${index}`"
		>
			<v-sheet height="100%">

				<v-row class="onboard__body">
					<v-col v-for="i in maxCols" :cols="12 / maxCols">
						<info-card />
					</v-col>
				</v-row>

			</v-sheet>
		</v-carousel-item>

	</v-carousel>
</template>

<script lang="ts">
import { computed } from "vue";
import store from "@/store";
import { useDisplay } from "vuetify";

import Card from "@/components/cards/Card.vue";
import InfoCard from "./components/InfoCard.vue";

export default {
	name: "onboard",
	components: { Card, InfoCard },
	setup()
	{
		const { xl, lg, md, sm } = useDisplay();

		const onboardCardList = computed(() => store.getters["app/onboardCardList"]);
		const maxCols = computed(() => xl.value ? 4 : lg.value ? 3 : md.value ? 3 : sm.value ? 2 : 1);

		return {
			onboardCardList,
			maxCols
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard {
	&__body {
		height: calc(100% - 40px);
		margin: 0;
	}

	::v-deep(.v-sheet) {
		background: rgba(255,255,255,0.5);
	}
}
</style>
