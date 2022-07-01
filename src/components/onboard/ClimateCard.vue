<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('ClimateCard_Title')" icon-name="climate" @click-options="onClickOptions">
		<CardSection2Icons
			:title="$t('ClimateCard_StatusWork_Title')"
			:comment="$t('ClimateCard_StatusWork_Comment')"
			icon1-name="climate"
			:icon1-value="enabled"
		/>
		<CardSectionToggle
			:title="$t('ClimateCard_AutoMode_Title')"
			:comment="$t('ClimateCard_AutoMode_Comment')"
			v-model="autoMode"
		/>
		<CardSectionToggle :title="$t('ClimateCard_AC_Title')" :comment="$t('ClimateCard_AC_Comment')" v-model="ac" />
		<CardSectionInput
			:title="$t('ClimateCard_Temperature_Title')"
			:comment="$t('ClimateCard_Temperature_Comment')"
			v-model="temperature"
			temperature
			readonly
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
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';

export default {
	name: 'ClimateCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	setup() {
		const enabled = computed((): boolean => store.climateValue.enabled);
		const autoMode = computed((): boolean => store.climateValue.automode);
		const ac = computed((): boolean => store.climateValue.ac);
		const temperature = computed((): number => store.climateValue.temperature);

		const onClickOptions = (e: any): void => {
			console.log('ClimateCard -> onClickOptions', e);
		};

		return {
			enabled,
			autoMode,
			ac,
			temperature,
			onClickOptions
		};
	}
};
</script>
