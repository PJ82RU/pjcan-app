<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('InfoCard_Title')" @click-options="onClickOptions">
		<CardSectionToggle title="ACC" :comment="$t('InfoCard_ACC_Comment')" v-model="acc" />
		<!--<CardSectionTime :title="$t('InfoCard_TimeWork_Title')" :comment="$t('InfoCard_TimeWork_Comment')" v-model="time" />-->
		<CardSectionInput
			temperature
			:title="$t('InfoCard_Temperature_Title')"
			:comment="$t('InfoCard_Temperature_Comment')"
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
		const temperature = computed((): number => store.temperatureValue.out);

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
