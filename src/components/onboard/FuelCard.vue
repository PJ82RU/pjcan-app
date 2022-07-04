<template>
	<CardSection
		class="FuelCard"
		type="FuelCard"
		:title="$t('FuelCard_Title')"
		icon-name="fuel"
		@click-options="onClickOptions"
	>
		<CardSectionInput
			:title="$t('FuelCard_Current_Title')"
			:comment="$t('FuelCard_Current_Comment')"
			v-model="current"
			readonly
		/>
		<CardSectionInput
			:title="$t('FuelCard_AVG_Title')"
			:comment="$t('FuelCard_AVG_Comment')"
			v-model="avg"
			readonly
		/>
		<CardSectionInput
			:title="$t('FuelCard_Total_Title')"
			:comment="$t('FuelCard_Total_Comment')"
			v-model="total"
			readonly
		/>
		<CardSectionInput
			:title="$t('FuelCard_Consumption_Title')"
			:comment="$t('FuelCard_Consumption_Comment')"
			v-model="consumption"
			readonly
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionInput from '@/components/cardSections_/CardSectionInput.vue';

export default {
	name: 'FuelCard',
	components: { CardSection, CardSectionInput },
	setup() {
		const store: Ref | undefined = inject('store');
		const { fuelValue } = store?.value;

		const current = computed((): string => fuelValue.current.toFixed(1));
		const avg = computed((): string => fuelValue.avg.toFixed(1));
		const total = computed((): string => fuelValue.total.toFixed(2));
		const consumption = computed((): string => fuelValue.consumption.toFixed(2));

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
