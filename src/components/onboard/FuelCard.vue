<template>
	<CardSection
		class="FuelCard"
		type="FuelCard"
		:title="$t('FuelCard_Title')"
		icon-name="fuel"
		:menu-card-section="menuFuelCard"
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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import { menuFuelCard } from '@/store/menu/MenuFuelCard';
import { FuelValue, IFuelValue } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_FUEL } from '@/store/api';

export default {
	name: 'FuelCard',
	components: { CardSection, CardSectionInput },
	setup() {
		const fuelValue = ref(new FuelValue());
		const onReceive = (res: IFuelValue): void => {
			fuelValue.value.setModel(res);
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_FUEL, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_FUEL, onReceive);
		});

		const current = computed((): string => fuelValue.value.current.toFixed(1));
		const avg = computed((): string => fuelValue.value.avg.toFixed(1));
		const total = computed((): string => fuelValue.value.total.toFixed(2));
		const consumption = computed((): string => fuelValue.value.consumption.toFixed(2));

		const onClickOptions = (e: any): void => {
			console.log('FuelCard -> onClickOptions', e);
		};

		return {
			current,
			avg,
			total,
			consumption,
			menuFuelCard,
			onClickOptions
		};
	}
};
</script>
