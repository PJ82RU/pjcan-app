<!--suppress RequiredAttributes -->
<template>
	<CardSection title="Информация" @click-options="onClickOptions">
		<CardSectionToggle title="ACC" comment="Питание автомобиля" v-model="acc" />
		<!--<CardSectionTime title="Время работы" comment="Время работы устройства с момента включения" v-model="time" />-->
		<CardSectionInput
			title="Температура воздуха"
			comment="Показания внешней температуры со штатных датчиков автомобиля"
			v-model="temperature"
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed } from 'vue';
import store from '@/store';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';

export default {
	name: 'InfoCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput },
	setup() {
		const acc = computed((): boolean => store.sensorValue.acc);
		//const time = computed((): boolean => store.);
		const temperature = computed((): string => `${store.temperatureValue.out}°C`);

		const onClickOptions = (e: any): void => {
			console.log('InfoCard -> onClickOptions', e);
		};

		return {
			acc,
			temperature,
			onClickOptions
		};
	}
};
</script>
