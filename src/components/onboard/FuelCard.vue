<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('FuelCard_Title')" @click-options="onClickOptions">
		<CardSectionInput
			:title="$t('FuelCard_Current_Title')"
			:comment="$t('FuelCard_Current_Comment')"
			v-model="current"
		/>
		<CardSectionInput :title="$t('FuelCard_AVG_Title')" :comment="$t('FuelCard_AVG_Comment')" v-model="avg" />
		<CardSectionInput :title="$t('FuelCard_Total_Title')" :comment="$t('FuelCard_Total_Comment')" v-model="total" />
		<CardSectionInput
			:title="$t('FuelCard_Consumption_Title')"
			:comment="$t('FuelCard_Consumption_Comment')"
			v-model="consumption"
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed } from 'vue';
import store from '@/store';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';

export default {
	name: 'FuelCard',
	components: { CardSection, CardSectionInput },
	setup() {
		const current = computed((): string => store.fuelValue.current.toFixed(1));
		const avg = computed((): string => store.fuelValue.avg.toFixed(1));
		const total = computed((): string => store.fuelValue.total.toFixed(2));
		const consumption = computed((): string => store.fuelValue.consumption.toFixed(2));

		const onClickOptions = (e: any): void => {
			console.log('FuelCard -> onClickOptions', e);
		};

		return {
			current,
			avg,
			total,
			consumption,
			onClickOptions
		};
	}
};
</script>
