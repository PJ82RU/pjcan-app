<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('EngineCard_Title')" @click-options="onClickOptions">
		<CardSection2Icons
			:title="$t('EngineCard_Enabled_Title')"
			:comment="$t('EngineCard_Enabled_Comment')"
			icon1Name="engine"
			:icon1Value="enabled"
		/>
		<CardSectionInput :title="$t('EngineCard_RPM_Title')" :comment="$t('EngineCard_RPM_Comment')" v-model="rpm" />
		<CardSectionInput
			:title="$t('EngineCard_CountRPM_Title')"
			:comment="$t('EngineCard_CountRPM_Comment')"
			v-model="countRPM"
		/>
		<CardSectionTime
			:title="$t('EngineCard_Motors_Title')"
			:comment="$t('EngineCard_Motors_Comment')"
			v-model="mseconds"
		/>
		<CardSectionProgress
			:title="$t('EngineCard_Load_Title')"
			:comment="$t('EngineCard_Load_Comment')"
			:value="load"
		/>
		<CardSectionProgress
			:title="$t('EngineCard_Throttle_Title')"
			:comment="$t('EngineCard_Throttle_Comment')"
			:value="throttle"
		/>
		<CardSectionInput
			temperature
			:title="$t('EngineCard_Coolant_Title')"
			:comment="$t('EngineCard_Coolant_Comment')"
			v-model="coolant"
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
import CardSectionProgress from '@/components/cardSections/CardSectionProgress.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';

export default {
	name: 'EngineCard',
	components: {
		CardSection,
		CardSectionTime,
		CardSectionToggle,
		CardSectionInput,
		CardSectionProgress,
		CardSection2Icons
	},
	setup() {
		const enabled = computed((): boolean => store.engineValue.enabled);
		const rpm = computed((): string => store.engineValue.rpm.toString());
		const countRPM = computed((): string => store.engineValue.countRPM.toString());
		const load = computed((): string => store.engineValue.load.toString());
		const mseconds = computed((): string => store.engineValue.mseconds.toString());
		const throttle = computed((): number => store.engineValue.throttle);
		const coolant = computed((): number => store.engineValue.coolant);

		const onClickOptions = (e: any): void => {
			console.log('EngineCard -> onClickOptions', e);
		};

		return {
			enabled,
			rpm,
			countRPM,
			load,
			mseconds,
			throttle,
			coolant,
			onClickOptions
		};
	}
};
</script>
