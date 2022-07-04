<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="EngineCard"
		type="EngineCard"
		:title="$t('EngineCard_Title')"
		icon-name="engine"
		@click-options="onClickOptions"
	>
		<CardSection2Icons
			:title="$t('EngineCard_Enabled_Title')"
			:comment="$t('EngineCard_Enabled_Comment')"
			icon1-name="start-stop"
			:icon1-value="enabled"
		/>
		<CardSectionInput
			:title="$t('EngineCard_RPM_Title')"
			:comment="$t('EngineCard_RPM_Comment')"
			v-model="rpm"
			readonly
		/>
		<CardSectionInput
			:title="$t('EngineCard_CountRPM_Title')"
			:comment="$t('EngineCard_CountRPM_Comment')"
			v-model="countRPM"
			readonly
		/>
		<CardSectionTime
			:title="$t('EngineCard_Motors_Title')"
			:comment="$t('EngineCard_Motors_Comment')"
			v-model="mseconds"
			readonly
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
			readonly
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionTime from '@/components/cardSections_/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections_/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections_/CardSectionInput.vue';
import CardSectionProgress from '@/components/cardSections_/CardSectionProgress.vue';
import CardSection2Icons from '@/components/cardSections_/CardSection2Icons.vue';

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
		const store: Ref | undefined = inject('store');
		const { engineValue } = store?.value;

		const enabled = computed((): boolean => engineValue.enabled);
		const rpm = computed((): string => engineValue.rpm.toFixed());
		const countRPM = computed((): string => engineValue.countRPM.toFixed());
		const load = computed((): number => engineValue.load);
		const mseconds = computed((): string => engineValue.mseconds.toFixed());
		const throttle = computed((): number => engineValue.throttle);
		const coolant = computed((): number => engineValue.coolant);

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
